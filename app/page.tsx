"use client";

import React, { useState } from "react";
import { AnalysisResult } from "@/app/types/forensics";
import ComparisonGrid from "@/components/ComparisonGrid";
import VerdictCard from "@/components/VerdictCard";
import {
  DocumentImport,
  WarningFilled,
  Information,
  ArrowRight,
  FlashFilled,
  ModelBuilder,
  CheckmarkFilled
} from "@carbon/icons-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ForensicDashboard() {
  const [rawInput, setRawInput] = useState("");
  const [clientNotes, setClientNotes] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<{ type: string; message: string } | null>(null);

  // Progress State
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Ready");
  const [loadingMode, setLoadingMode] = useState<'speed' | 'accuracy'>('speed');

  const handleAnalyze = async () => {
    // Reset State
    setResult(null);
    setError(null);
    setIsLoading(true);

    // 1. Basic Validation
    if (!rawInput.trim()) {
      setError({ type: "EMPTY_INPUT", message: "Please paste the plan comparison data." });
      setIsLoading(false);
      return;
    }

    // 2. Client-Side Triage (Predicting what the server will do)
    const NOTE_LENGTH_THRESHOLD = 300;
    const RAW_DATA_THRESHOLD = 12000;
    const COMPLEXITY_REGEX = /chronic|oncology|dialysis|transplant|metastatic|chemo/i;

    const isComplex =
      (clientNotes.length > NOTE_LENGTH_THRESHOLD) ||
      COMPLEXITY_REGEX.test(clientNotes);

    if (isComplex) {
      setLoadingMode('accuracy');
      setLoadingText("Initializing Deep Reasoning Engine...");
    } else {
      setLoadingMode('speed');
      setLoadingText("Initializing Forensic Flash Engine...");
    }

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sunfireData: rawInput, clientNotes }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Analysis failed.");
      }

      // Success
      setResult(data);
      setIsLoading(false);

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
            <h1 className="text-xl lg:text-2xl font-black uppercase tracking-tight mb-2">
              Medicare Forensics
            </h1>
            <p className="text-xs lg:text-sm text-gray-500">
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
              <div className="bg-red-50 border border-red-500 p-3 text-red-600 text-sm font-medium flex items-start gap-2 animate-in slide-in-from-top-2 rounded-none">
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
                <span className="animate-pulse flex items-center gap-2">
                  {loadingMode === 'speed' ? <FlashFilled className="w-4 h-4" /> : <ModelBuilder className="w-4 h-4" />}
                  Processing...
                </span>
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

                <div className="text-center space-y-2">
                  <div className="text-xl font-mono font-bold uppercase tracking-widest">
                    {loadingText}
                  </div>
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
                    {/* UPGRADE BANNER: The Safety Net Feedback */}
                    {result._meta?.upgraded && (
                      <div className="mb-8 border-2 border-blue-600 bg-blue-50 p-4 flex items-start gap-4 rounded-none">
                        <ModelBuilder className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold uppercase text-blue-800 text-sm">Automated Upgrade Logic Triggered</h4>
                          <p className="text-blue-700 text-sm mt-1">
                            The standard Flash engine flagged this case as <strong>Highly Complex</strong>.
                            The system automatically upgraded to the <strong>Deep Reasoning Engine</strong> to ensure 100% accuracy.
                            This adds ~40s to the runtime but guarantees a correct forensic verdict.
                          </p>
                        </div>
                      </div>
                    )}

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
                          <li key={i} className="flex items-start gap-4 text-base md:text-lg font-bold text-gray-900 leading-relaxed">
                            <span className="w-2 h-2 bg-black mt-2.5 shrink-0" />
                            <span>{point}</span>
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
