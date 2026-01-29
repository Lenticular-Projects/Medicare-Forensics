"use client";

import React from "react";
import { CheckmarkFilled, WarningFilled, CurrencyDollar } from "@carbon/icons-react";
import { motion } from "framer-motion";

interface FinancialMetric {
    category: string;
    current_value: number;
    challenger_value: number;
    diff: number;
    winner: "CURRENT" | "CHALLENGER" | "TIE";
}

interface FinancialAnalysisProps {
    analysis: {
        annual_premium_savings: number;
        moop_risk_reduction: number;
        metrics: FinancialMetric[];
    };
    currentPlanName: string;
    challengerPlanName: string;
}

export function FinancialAnalysisCard({ analysis, currentPlanName, challengerPlanName }: FinancialAnalysisProps) {
    const isPremiumSaver = analysis.annual_premium_savings > 0;
    const isRiskSaver = analysis.moop_risk_reduction > 1000; // Only highlight if significant

    return (
        <div className="w-full bg-white border border-black p-0 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-black">

            {/* HEADER: The "Headline" of the Money */}
            <div className={`p-4 border-b border-black flex items-center gap-3 ${isPremiumSaver ? "bg-green-100" : isRiskSaver ? "bg-blue-100" : "bg-gray-100"}`}>
                <div className="p-2 bg-black text-white shrink-0">
                    <CurrencyDollar className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-black uppercase tracking-tight leading-none">
                        {isPremiumSaver
                            ? `SAVE $${analysis.annual_premium_savings} PER YEAR`
                            : isRiskSaver
                                ? "SIGNIFICANTLY LOWER FINANCIAL RISK"
                                : "FINANCIAL OVERVIEW"}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-wider opacity-70 mt-1">
                        {isPremiumSaver
                            ? "Based on Monthly Premiums"
                            : isRiskSaver
                                ? `Max Out-of-Pocket is $${analysis.moop_risk_reduction.toLocaleString()} Lower`
                                : "Comparison of Fixed Costs"}
                    </p>
                </div>
            </div>

            {/* THE TABLE */}
            <div className="text-sm">
                {/* Header Row */}
                <div className="grid grid-cols-3 border-b border-black bg-gray-50 text-xs font-bold uppercase tracking-widest">
                    <div className="p-3">Metric</div>
                    <div className="p-3 border-l border-black text-gray-500 truncate">{currentPlanName}</div>
                    <div className="p-3 border-l border-black text-blue-600 truncate">{challengerPlanName}</div>
                </div>

                {/* Data Rows */}
                {analysis.metrics.map((metric, idx) => {
                    const isChallengerBetter = metric.winner === "CHALLENGER";
                    const isCurrentBetter = metric.winner === "CURRENT";

                    return (
                        <div key={idx} className="grid grid-cols-3 border-b border-gray-200 last:border-0 hover:bg-gray-50">
                            <div className="p-3 font-bold flex items-center gap-2">
                                {metric.category}
                            </div>

                            {/* Current Plan Value */}
                            <div className={`p-3 border-l border-gray-300 font-mono ${isCurrentBetter ? "bg-green-50 font-bold" : ""}`}>
                                {formatCurrency(metric.current_value)}
                                {isCurrentBetter && <CheckmarkFilled className="inline-block w-4 h-4 ml-1 text-green-600" />}
                            </div>

                            {/* Challenger Plan Value */}
                            <div className={`p-3 border-l border-gray-300 font-mono ${isChallengerBetter ? "bg-blue-50 font-bold text-blue-700" : ""}`}>
                                {formatCurrency(metric.challenger_value)}
                                {isChallengerBetter && <CheckmarkFilled className="inline-block w-4 h-4 ml-1 text-blue-600" />}
                                {/* Warn if Current was better (Visual Red Flag) */}
                                {isCurrentBetter && <WarningFilled className="inline-block w-4 h-4 ml-1 text-red-500" />}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function formatCurrency(val: number) {
    if (val === 0) return "$0";
    return "$" + val.toLocaleString();
}
