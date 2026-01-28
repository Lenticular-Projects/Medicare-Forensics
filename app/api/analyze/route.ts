import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Ensure your API key is in your .env file as GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// SYSTEM PROMPT: The Forensic Logic
const SYSTEM_INSTRUCTION = `You are a Medicare Forensic Auditor.
Input: Raw text dump from Sunfire (3 Columns).
Column Map: Column 1 = Current Plan. Column 2 = Challenger A. Column 3 = Challenger B.

PROTOCOL 1: IDENTITY VERIFICATION (Crucial)
Scan the very top of the text. Capture the Full Plan Names for all 3 columns (e.g., 'UHC Dual Complete FL-Y5').
Store these names. You will need to display them in the final JSON.

PROTOCOL 2: THE SEMI-FINAL (Elimination Round)
Compare Challenger A vs. Challenger B.
Calculate 'Cash Value' (OTC + Giveback + Dental Limit).
Action: Pick the winner. Discard the loser.
Note: If there is only 1 challenger, skip this step.

PROTOCOL 3: THE FINAL AUDIT (Current vs. Winner)
Compare Current Plan vs. The Winning Challenger.
Verdict Logic:
STAY: If Current Plan has higher/equal OTC, Dental, and Transport.
SWITCH: Only if the Challenger offers significantly higher cash benefits (+$600/yr) OR User Notes demand a switch.

PROTOCOL 4: DEEP EXTRACTION (The Evidence)
You must extract data for TWO lists.
For every single data point, you must extract:
1. "display_value": The headline number (e.g. "$4,000/yr").
2. "tooltip_header": A short, punchy 2-4 word summary. 
   - Good: "Comprehensive Coverage", "Coverage Gaps Detected", "Unicorn Benefit", "Standard Benefit".
3. "tooltip_bullets": An array of strings with specific details. Use **Bold** for keys.
   - Example: ["**Preventive:** $0 Copay", "**Implants:** Not Covered"]

   - **Dental:** Detail Network, Preventive vs Comprehensive, Implants.
   - **OTC:** Detail Food/Utilities/Rent, Rollover rules.
   - **Transport:** Detail Medical vs Personal use.
   - **Ambulance:** Detail Admitted Waiver rules.

List A: The Primary Drivers (The 'Closers')
Part B Giveback (Look for 'reduction/credit')
Over-the-Counter (OTC) (Look for 'Food', 'Utilities', 'Flex')
Dental Allowance (Total $ amount)
Transportation (Number of rides)
Vision (Eyewear Allowance)
Hearing (Aid Allowance)

List B: The Forensic Details (The 'Just in Case')
Extract ALL of the following comparisons:
Ambulance Copay
Emergency Room Copay
Inpatient Hospital (Daily copay)
Specialist Visit Copay
Doctor Office Visit (PCP)
Chiropractic Services
Podiatry Services
Durable Medical Equipment (DME %)
Diabetes Supplies (Copay/Brand rules)
Diagnostic Tests/Lab/X-Ray
Mental Health (Outpatient)
Skilled Nursing (SNF)
Physical Therapy
Urgent Care

OUTPUT JSON STRUCTURE:
{
  "verdict": "STAY" | "SWITCH",
  "verdict_headline": "Stay - Your Current UHC Plan is Superior",
  "executive_summary": "4-5 sentence simple summary. Name the plans. Explain WHY the winner won (e.g. 'UHC gives you $349 OTC, while the challenger Humana only gives $229').",
  "challenger_analysis": {
    "did_tournament_occur": true,
    "winner_name": "Full Plan Name of Winner",
    "loser_name": "Full Plan Name of Loser",
    "reason_for_win": "Detailed reason why it won (e.g. Higher total cash value)",
    "knockout_stat": "The specific stat that ended it (e.g. +$2,000 in Dental)"
  },
  "plan_headers": {
    "current_name": "Full Name of Current Plan",
    "challenger_name": "Full Name of Winning Challenger"
  },
  "sales_ammunition": [
    "Bullet 1: Compare OTC",
    "Bullet 2: Compare Dental",
    "Bullet 3: Compare Part B Giveback"
  ],
  "primary_grid": [
    { 
      "category": "Over-the-Counter", 
      "winner": "CURRENT" | "CHALLENGER" | "TIE", 
      "current": { 
        "display_value": "$349/mo", 
        "tooltip_header": "Unicorn Benefit",
        "tooltip_bullets": ["**Includes:** Food, Utilities, Rent", "**Rollover:** Yes"]
      }, 
      "challenger": { 
        "display_value": "$229/mo", 
        "tooltip_header": "Standard Benefit",
        "tooltip_bullets": ["**Includes:** OTC Meds only", "**Rollover:** No"]
      } 
    }
  ],
  "forensic_grid": [
    { 
      "category": "Ambulance", 
      "winner": "CURRENT" | "CHALLENGER" | "TIE", 
      "current": { 
        "display_value": "$0", 
        "tooltip_header": "Full Coverage",
        "tooltip_bullets": ["**Copay:** $0", "**Waiver:** Waived if admitted"]
      }, 
      "challenger": { 
        "display_value": "20%", 
        "tooltip_header": "High Cost Risk",
        "tooltip_bullets": ["**Coinsurance:** You pay 20%", "**Example:** Pay $200 on $1k ride"]
      } 
    }
  ]
}`;

export async function POST(req: Request) {
  try {
    const { sunfireData, clientNotes } = await req.json();

    // 1. Configure the Model (Using gemini-2.5-pro as requested 1.5-pro is unavailable)
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-pro",
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.0,
        maxOutputTokens: 16000,
      },
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      ],
    });

    // 2. The Prompt
    const prompt = `
      RAW SUNFIRE TEXT:
      ${sunfireData}

      USER NOTES / NUANCES:
      ${clientNotes || "None"}
    `;

    // 3. Generate
    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();

    // 4. Double-Check Cleaning
    if (text.startsWith("```json")) {
      text = text.replace(/^```json/, "").replace(/```$/, "");
    } else if (text.startsWith("```")) {
      text = text.replace(/^```/, "").replace(/```$/, "");
    }

    // 5. Parse and Return
    const jsonResponse = JSON.parse(text);
    return NextResponse.json(jsonResponse);

  } catch (error) {
    console.error("Analysis Error:", error);
    return NextResponse.json(
      { error: "Failed to analyze plans. Please check the text input." },
      { status: 500 }
    );
  }
}
