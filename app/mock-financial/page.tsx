"use client";

import React from "react";
import { DocumentImport, Information, ArrowRight } from "@carbon/icons-react";
import VerdictCard from "@/components/VerdictCard";
import ComparisonGrid from "@/components/ComparisonGrid";
import { FinancialAnalysisCard } from "@/components/FinancialAnalysisCard";

export default function MockFinancialPage() {
    // --- MOCK DATA ---
    const mockAnalysis = {
        verdict: "SWITCH" as const,
        verdict_headline: "Switch to Humana Gold Plus",
        executive_summary: "While both plans have a $0 premium, the Humana Gold Plus plan offers significantly better financial protection. Your current UHC plan exposes you to $5,900 in max out-of-pocket costs, whereas Humana caps this at $3,900. This is a $2,000 safety net upgrade.",
        sales_ammunition: [
            "Lowers your Max Out-of-Pocket risk by $2,000",
            "Maintains $0 Monthly Premium",
            "Includes similar dental and vision benefits"
        ],
        // FINANCIALS (The New Part)
        financial_analysis: {
            annual_premium_savings: 0,
            moop_risk_reduction: 2000,
            metrics: [
                { category: "Monthly Premium", current_value: 0, challenger_value: 0, diff: 0, winner: "TIE" as const },
                { category: "Medical Deductible", current_value: 0, challenger_value: 0, diff: 0, winner: "TIE" as const },
                { category: "Max Out-of-Pocket", current_value: 5900, challenger_value: 3900, diff: -2000, winner: "CHALLENGER" as const },
                { category: "Drug Deductible", current_value: 355, challenger_value: 615, diff: 260, winner: "CURRENT" as const },
            ]
        },
        // TOURNAMENT (Required by Grid)
        challenger_analysis: {
            did_tournament_occur: true,
            winner_name: "Humana Gold Plus",
            loser_name: "HumanaChoice PPO",
            reason_for_win: "Lower MOOP and better stability.",
            knockout_stat: "$2,000 Lower Risk"
        }
    };

    const mockHeaders = {
        current_name: "UHC Complete Care OK-8",
        challenger_name: "Humana Gold Plus (HMO C-SNP)"
    };

    // Using a simplified Version of the Grid for context
    const mockGrid = [
        { category: "OTC Allowance", winner: "TIE" as const, current: { display_value: "$150/mo", tooltip_summary: "Standard" }, challenger: { display_value: "$150/mo", tooltip_summary: "Standard" } },
        { category: "Dental Limit", winner: "CHALLENGER" as const, current: { display_value: "$2,000", tooltip_summary: "Basic" }, challenger: { display_value: "$3,000", tooltip_summary: "Enhanced" } },
    ];

    return (
        <main className="min-h-screen bg-white text-black font-sans selection:bg-green-100 selection:text-black">
            <div className="flex flex-col lg:flex-row min-h-screen">

                {/* --- LEFT SIDEBAR (Standard) --- */}
                <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-black font-mono p-6 lg:p-8 flex flex-col bg-gray-50/50">
                    <div className="mb-8">
                        <h1 className="text-2xl font-black uppercase tracking-tight mb-2">Medicare Forensics</h1>
                        <p className="text-sm text-gray-500">Paste 3-column Sunfire comparison data below.</p>
                    </div>

                    <div className="flex-1 space-y-6 opacity-50 pointer-events-none">
                        {/* Disabled Inputs for Visual Context */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                <DocumentImport className="w-4 h-4" /> Raw Data Dump
                            </label>
                            <textarea disabled className="w-full h-64 p-4 text-xs bg-white border border-black resize-none" value="[MOCK DATA LOCKED]" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                <Information className="w-4 h-4" /> Client Nuances
                            </label>
                            <textarea disabled className="w-full h-32 p-4 text-xs bg-white border border-black resize-none" value="MOCK MODE" />
                        </div>
                    </div>

                    <div className="mt-8">
                        <button disabled className="w-full bg-black text-white h-14 font-black uppercase tracking-widest flex items-center justify-center gap-2">
                            Audit Complete <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* --- RIGHT PANEL: RESULTS (The Focus) --- */}
                <div className="w-full lg:w-2/3 p-6 lg:p-12 overflow-y-auto relative">
                    <div className="max-w-4xl mx-auto pb-20">

                        {/* 1. Verdict Card */}
                        <VerdictCard
                            verdict={mockAnalysis.verdict}
                            verdictTitle={mockAnalysis.verdict_headline}
                            summary={mockAnalysis.executive_summary}
                        // Note: Annual savings are $0, so we don't pass annualDifference here to avoid $0 confusion
                        />

                        {/* 2. THE NEW FINANCIAL CARD (Contextualized) */}
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-black pb-2 text-gray-400">
                            Forensic Financial Audit
                        </h4>

                        <FinancialAnalysisCard
                            analysis={mockAnalysis.financial_analysis}
                            currentPlanName={mockHeaders.current_name}
                            challengerPlanName={mockHeaders.challenger_name}
                        />

                        {/* 3. Sales Ammunition */}
                        <div className="mb-12">
                            <h4 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-black pb-2 text-gray-400">
                                Talking Points
                            </h4>
                            <ul className="space-y-3">
                                {mockAnalysis.sales_ammunition.map((point, i) => (
                                    <li key={i} className="flex items-start gap-3 text-lg font-medium">
                                        <span className="w-1.5 h-1.5 bg-black mt-2.5 rounded-none shrink-0" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 4. The Grid */}
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-black pb-2 text-gray-400">
                            Forensic Evidence
                        </h4>
                        <ComparisonGrid
                            primaryGrid={mockGrid}
                            forensicGrid={[]}
                            headers={mockHeaders}
                            challengerAnalysis={mockAnalysis.challenger_analysis}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
