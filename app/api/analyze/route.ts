import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { MODELS, AnalysisResult } from "@/app/types/forensics";

// Ensure your API key is in your .env file as GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// SYSTEM PROMPT: The Forensic Logic
const SYSTEM_INSTRUCTION = `You are a Medicare Forensic Auditor.
CRITICAL: Be extremely concise. Maximize speed. Tooltips must be <10 words.
Input: Raw text dump from Sunfire(3 Columns).
Column Map: Column 1 = Current Plan.Column 2 = Challenger A.Column 3 = Challenger B.

  PROTOCOL 1: IDENTITY VERIFICATION(Crucial)
Scan the very top of the text.Capture the Full Plan Names for all 3 columns(e.g., 'UHC Dual Complete FL-Y5').
Store these names.You will need to display them in the final JSON.

  PROTOCOL 2: THE SEMI - FINAL(Elimination Round)
Compare Challenger A vs.Challenger B.
  Calculate 'Cash Value'(OTC + Giveback + Dental Limit).
    Action: Pick the winner.Discard the loser.
      Note: If there is only 1 challenger, skip this step.

        PROTOCOL 3: THE FINAL AUDIT(Current vs.Winner)
Compare Current Plan vs.The Winning Challenger.
Verdict Logic:
STAY: If Current Plan has higher / equal OTC, Dental, and Transport.
  SWITCH: Only if the Challenger offers significantly higher cash benefits(+$600 / yr) OR User Notes demand a switch.

    PROTOCOL 4: DEEP EXTRACTION(The Evidence)
You must extract data for TWO lists.
For every single data point, you must extract:
1. "display_value": The headline number(e.g. "$4,000/yr").
2. "tooltip_header": A short, punchy 2 - 4 word summary. 
   - Good: "Comprehensive Coverage", "Coverage Gaps Detected", "Unicorn Benefit", "Standard Benefit".
3. "tooltip_bullets": An array of strings with specific details.Use ** Bold ** for keys.
   - Example: ["**Preventive:** $0 Copay", "**Implants:** Not Covered"]

    - ** Dental:** Detail Network, Preventive vs Comprehensive, Implants.
   - ** OTC:** Detail Food / Utilities / Rent, Rollover rules.
   - ** Transport:** Detail Medical vs Personal use.
   - ** Ambulance:** Detail Admitted Waiver rules.

List A: The Primary Drivers(The 'Closers')
Part B Giveback(Look for 'reduction/credit')
  Over - the - Counter(OTC)(Look for 'Food', 'Utilities', 'Flex')
Dental Allowance(Total $ amount)
Transportation(Number of rides)
Vision(Eyewear Allowance)
Hearing(Aid Allowance)

List B: The Forensic Details(The 'Just in Case')
Extract ALL of the following comparisons:
Ambulance Copay
Emergency Room Copay
Inpatient Hospital(Daily copay)
Specialist Visit Copay
Doctor Office Visit(PCP)
Chiropractic Services
Podiatry Services
Durable Medical Equipment(DME %)
Diabetes Supplies(Copay / Brand rules)
Diagnostic Tests / Lab / X - Ray
Mental Health(Outpatient)
Skilled Nursing(SNF)
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
} `;

// --- HELPER LOGIC ---

// 1. "The Triage Nurse" - Decides between Speed (Flash) and Accuracy (Pro)
function selectModel(notes: string, rawLength: number): keyof typeof MODELS {
  const NOTE_LENGTH_THRESHOLD = 300;
  const RAW_DATA_THRESHOLD = 12000;
  const COMPLEXITY_REGEX = /chronic|oncology|dialysis|transplant|metastatic|chemo/i;

  // Rule 1: Complex Medical or Situation -> Accuracy
  if (notes && (notes.length > NOTE_LENGTH_THRESHOLD || COMPLEXITY_REGEX.test(notes))) {
    return 'accuracy';
  }

  // Rule 2: Massive Data Dump -> REMOVED (Flash 2.0 handles 1M tokens)
  // if (rawLength > RAW_DATA_THRESHOLD) { return 'accuracy'; }

  // Default -> Speed
  return 'speed';
}

// 2. Validation - Ensures the JSON isn't hallucinated garbage
function isValidAnalysis(json: any): boolean {
  if (!json || typeof json !== 'object') return false;

  // Must have a verdict
  if (!['STAY', 'SWITCH'].includes(json.verdict)) return false;

  // Must have valid grids
  if (!Array.isArray(json.primary_grid) || json.primary_grid.length === 0) return false;

  // Must have plan headers
  if (!json.plan_headers?.current_name) return false;

  return true;
}

export async function POST(req: Request) {
  try {
    const { sunfireData, clientNotes } = await req.json();

    // 1. Triage: Pick our engine
    let selectedModelKey = selectModel(clientNotes || "", sunfireData?.length || 0);
    let usedFallback = false;

    console.log(`[Forensics] Triage Result: ${selectedModelKey} `);

    // 2. Configure & Run
    const runAnalysis = async (modelKey: keyof typeof MODELS) => {
      const modelName = MODELS[modelKey];
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: SYSTEM_INSTRUCTION,
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.0, // Strict
          maxOutputTokens: 16000,
        },
        safetySettings: [
          { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        ],
      });

      const prompt = `
        RAW SUNFIRE TEXT:
        ${sunfireData}
  
        USER NOTES / NUANCES:
        ${clientNotes || "None"}
`;

      const result = await model.generateContent(prompt);
      const output = await result.response;
      let text = output.text();

      // Clean Markdown
      if (text.startsWith("```json")) {
        text = text.replace(/^```json/, "").replace(/```$/, "");
      } else if (text.startsWith("```")) {
        text = text.replace(/^```/, "").replace(/```$/, "");
      }

      return JSON.parse(text);
    };

    // 3. Execution with Fallback Logic
    let analysis: AnalysisResult;

    try {
      // Attempt Primary Choice
      analysis = await runAnalysis(selectedModelKey);

      // Validate
      if (!isValidAnalysis(analysis)) {
        throw new Error("Validation Failed: Missing critical fields.");
      }

    } catch (primaryError) {
      console.warn(`[Forensics] Primary Model (${selectedModelKey}) Failed:`, primaryError);

      // If we were already using accuracy, we are done. Fail.
      if (selectedModelKey === 'accuracy') {
        throw primaryError;
      }

      // If we were using speed, FALLBACK to accuracy
      console.log("[Forensics] Upgrading to Accuracy Model...");
      selectedModelKey = 'accuracy';
      usedFallback = true;
      analysis = await runAnalysis('accuracy');
    }

    // 4. Metadata Injection
    analysis._meta = {
      upgraded: usedFallback,
      model_used: MODELS[selectedModelKey]
    };

    return NextResponse.json(analysis);

  } catch (error: any) {
    console.error("Analysis Error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred during analysis." },
      { status: 500 }
    );
  }
}
