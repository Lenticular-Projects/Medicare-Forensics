"use client";

import React, { useState } from "react";
import { AnalysisResult } from "@/app/types/forensics";
import ComparisonGrid from "@/components/ComparisonGrid";
import VerdictCard from "@/components/VerdictCard";
import {
  DocumentImport,
  WarningFilled,
  Information,
  ArrowRight
} from "@carbon/icons-react";
import { motion, AnimatePresence } from "framer-motion";

// Loading Steps
const LOADING_STEPS = [
  "Parsing benefits data...",
  "Eliminating weaker option...",
  "Calculating annual impact...",
  "Finalizing verdict..."
];

export default function ForensicDashboard() {
  const [rawInput, setRawInput] = useState("");
  const [clientNotes, setClientNotes] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<{ type: string; message: string } | null>(null);
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    // Reset State
    setResult(null);
    setError(null);
    setIsLoading(true);
    setLoadingStep(0);

    // 1. Basic Validation
    if (!rawInput.trim()) {
      setError({ type: "EMPTY_INPUT", message: "Please paste the plan comparison data." });
      setIsLoading(false);
      return;
    }

    // 2. Loading Sequence Simulation
    try {
      const stepInterval = setInterval(() => {
        setLoadingStep(prev => {
          if (prev < LOADING_STEPS.length - 1) return prev + 1;
          return prev;
        })
      }, 600);

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sunfireData: rawInput, clientNotes }),
      });

      clearInterval(stepInterval);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Analysis failed.");
      }

      // Success
      setLoadingStep(LOADING_STEPS.length); // Complete
      setTimeout(() => {
        setResult(data);
        setIsLoading(false);
      }, 500); // Small delay to show final step

    } catch (err: any) {
      setError({ type: "API_ERROR", message: err.message || "An unexpected error occurred." });
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-green-100 selection:text-black">
      <div className="flex flex-col lg:flex-row min-h-screen">

        {/* LEFT SIDEBAR: INPUTS */}
        <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-black font-mono p-6 lg:p-8 flex flex-col bg-gray-50/50">
          <div className="mb-8">
            <h1 className="text-2xl font-black uppercase tracking-tight mb-2">
              Medicare Forensics
            </h1>
            <p className="text-sm text-gray-500">
              Paste 3-column Sunfire comparison data below.
            </p>
          </div>

          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <DocumentImport className="w-4 h-4" />
                Raw Data Dump
              </label>
              <textarea
                value={rawInput}
                onChange={(e) => setRawInput(e.target.value)}
                placeholder="PASTE 3-COLUMN DATA HERE..."
                className="w-full h-64 p-4 text-xs lg:text-sm bg-white border border-black rounded-none focus:ring-0 focus:outline-none focus:border-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <Information className="w-4 h-4" />
                Client Nuances
              </label>
              <textarea
                value={clientNotes}
                onChange={(e) => setClientNotes(e.target.value)}
                placeholder="e.g. Dr. Smith is out of network..."
                className="w-full h-32 p-4 text-xs lg:text-sm bg-white border border-black rounded-none focus:ring-0 focus:outline-none focus:border-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow resize-none"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-500 p-3 text-red-600 text-sm font-medium flex items-start gap-2 animate-in slide-in-from-top-2">
                <WarningFilled className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-xs uppercase mb-1">Error: {error.type}</span>
                  {error.message}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8">
            <button
              onClick={handleAnalyze}
              disabled={isLoading || !rawInput}
              className="w-full bg-black text-white h-14 font-black uppercase tracking-widest hover:invert transition-all disabled:opacity-50 disabled:hover:invert-0 flex items-center justify-center gap-2 rounded-none group"
            >
              {isLoading ? (
                <span className="animate-pulse">Running Audit...</span>
              ) : (
                <>
                  Start Forensic Audit
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT PANEL: RESULTS */}
        <div className="w-full lg:w-2/3 p-6 lg:p-12 overflow-y-auto relative">

          <AnimatePresence mode="wait">
            {!result && !isLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-gray-300 pointer-events-none"
              >
                <DocumentImport className="w-24 h-24 mb-4 opacity-20" />
                <p className="text-2xl font-black uppercase text-gray-200">Ready to Analyze</p>
              </motion.div>
            ) : isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center space-y-6"
              >
                <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                <div className="text-xl font-mono font-bold uppercase tracking-widest text-center">
                  {LOADING_STEPS[Math.min(loadingStep, LOADING_STEPS.length - 1)]}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-4xl mx-auto pb-20"
              >
                {result && (
                  <>
                    <VerdictCard
                      verdict={result.verdict}
                      verdictTitle={result.verdict_headline}
                      override={false}
                      summary={result.executive_summary}
                    />

                    {/* Sales Ammunition */}
                    <div className="mb-12">
                      <h4 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-black pb-2">
                        Talking Points
                      </h4>
                      <ul className="space-y-3">
                        {result.sales_ammunition.map((point, i) => (
                          <li key={i} className="flex items-start gap-3 text-lg font-medium">
                            <span className="w-1.5 h-1.5 bg-black mt-2.5 rounded-none shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* The Grid */}
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-black pb-2">
                      Forensic Evidence
                    </h4>
                    <ComparisonGrid
                      primaryGrid={result.primary_grid}
                      forensicGrid={result.forensic_grid}
                      headers={result.plan_headers}
                      challengerAnalysis={result.challenger_analysis}
                    />
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </main>
  );
}
