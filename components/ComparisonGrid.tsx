"use client";

import React from "react";
import { GridRow, TournamentResult } from "@/app/types/forensics";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { CheckmarkFilled, TrophyFilled } from "@carbon/icons-react";

interface ComparisonGridProps {
    primaryGrid: GridRow[];
    forensicGrid: GridRow[];
    headers: {
        current_name: string;
        challenger_name: string;
    };
    challengerAnalysis: TournamentResult;
}

export default function ComparisonGrid({
    primaryGrid,
    forensicGrid,
    headers,
    challengerAnalysis,
}: ComparisonGridProps) {

    return (
        <div className="w-full mt-8">
            {/* Tournament Result - Matchup Card */}
            {challengerAnalysis.did_tournament_occur && (
                <div className="mb-8 border-2 border-gray-900 bg-gray-50 p-4 font-sans">
                    {/* The Face-Off */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                        {/* Winner */}
                        <div className="flex items-center gap-3">
                            <TrophyFilled className="w-8 h-8 text-green-700" />
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xl font-bold leading-none text-black">
                                        {challengerAnalysis.winner_name}
                                    </span>
                                    <span className="bg-green-700 text-white text-[10px] uppercase font-bold px-1.5 py-0.5 tracking-wider">
                                        WINNER
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Defeated Divider */}
                        <div className="hidden md:flex items-center gap-2 opacity-50">
                            <div className="h-px w-8 bg-gray-400"></div>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">
                                Defeated
                            </span>
                            <div className="h-px w-8 bg-gray-400"></div>
                        </div>

                        {/* Loser */}
                        <div className="text-left md:text-right">
                            <div className="text-lg text-gray-400 line-through font-medium">
                                {challengerAnalysis.loser_name}
                            </div>
                        </div>
                    </div>

                    {/* The Why (Divider) */}
                    <div className="border-t border-gray-300 pt-3 flex flex-col md:flex-row md:items-center gap-2 text-sm md:text-base">
                        <span className="font-bold text-gray-900">
                            {challengerAnalysis.reason_for_win}
                        </span>
                        <span className="hidden md:inline text-gray-300">|</span>
                        <span className="font-black text-green-800 uppercase tracking-tight">
                            {challengerAnalysis.knockout_stat}
                        </span>
                    </div>
                </div>
            )}

            <div className="border border-black">
                {/* Dynamic Headers */}
                <div className="hidden md:grid grid-cols-3 border-b border-black bg-gray-50">
                    <div className="p-4 font-bold uppercase text-xs tracking-wider border-r border-black flex items-center">
                        Category
                    </div>
                    <div className="p-4 border-r border-black flex flex-col justify-center">
                        <span className="text-gray-500 text-xs uppercase mb-1">Current Plan</span>
                        <div className="font-bold text-lg md:text-xl uppercase tracking-tight leading-none">
                            {headers?.current_name || "Current Plan"}
                        </div>
                    </div>
                    <div className="p-4 flex flex-col justify-center">
                        <span className="text-gray-500 text-xs uppercase mb-1">Challenger</span>
                        <div className="font-bold text-lg md:text-xl uppercase tracking-tight leading-none">
                            {headers?.challenger_name || "New Plan"}
                        </div>
                    </div>
                </div>

                {/* Grid Renderer Helper */}
                <TooltipProvider delayDuration={200}>
                    <div className="flex flex-col">
                        {/* Primary Grid - The Closers */}
                        {primaryGrid.map((row, idx) => (
                            <GridRowItem key={`prim-${idx}`} row={row} isPrimary={true} />
                        ))}

                        {/* Forensic Divider */}
                        {forensicGrid.length > 0 && (
                            <div className="bg-black text-white p-2 text-center text-xs font-bold uppercase tracking-[0.2em]">
                                Detailed Forensic Evidence
                            </div>
                        )}

                        {/* Forensic Grid - The Details */}
                        {forensicGrid.map((row, idx) => (
                            <GridRowItem key={`foren-${idx}`} row={row} isPrimary={false} />
                        ))}
                    </div>
                </TooltipProvider>
            </div>
        </div>
    );
}

// Helper Component for structured tooltip rendering
function TooltipRenderer({ value }: { value: any }) {
    if (!value.tooltip_header && !value.tooltip_bullets) {
        // Fallback for legacy string data
        return <p>{value.tooltip_summary || value.tooltip}</p>;
    }

    return (
        <div className="flex flex-col gap-1">
            {value.tooltip_header && (
                <p className={`font-bold uppercase tracking-wider text-xs border-b border-gray-700 pb-1 mb-1 ${value.tooltip_header.includes("Gap") || value.tooltip_header.includes("Risk") || value.tooltip_header.includes("Standard")
                        ? "text-red-300"
                        : "text-green-400"
                    }`}>
                    {value.tooltip_header}
                </p>
            )}
            {value.tooltip_bullets && (
                <ul className="list-disc pl-4 space-y-1 text-gray-200">
                    {value.tooltip_bullets.map((bullet: string, i: number) => {
                        // Parse bolding **text**
                        const parts = bullet.split("**");
                        return (
                            <li key={i}>
                                {parts.map((part, idx) =>
                                    (idx % 2 === 1) ? <strong key={idx} className="text-white">{part}</strong> : part
                                )}
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    );
}

function GridRowItem({ row, isPrimary }: { row: GridRow; isPrimary: boolean }) {
    const textSize = isPrimary ? "text-lg md:text-xl font-bold" : "text-sm md:text-base font-medium";

    return (
        <div className="grid grid-cols-3 border-b border-black last:border-0 hover:bg-gray-50 transition-colors">
            {/* Category Label */}
            <div className="p-3 md:p-4 bg-white border-r border-black font-semibold text-xs md:text-sm uppercase tracking-wide flex items-center text-gray-600">
                {row.category}
            </div>

            {/* Current Value */}
            <div className={`p-3 md:p-4 md:border-r border-black relative transition-colors ${row.winner === "CURRENT" ? "bg-green-100 font-bold" : "bg-white"}`}>
                <div className="flex justify-between items-center md:hidden mb-1">
                    <span className="text-xs text-gray-500 uppercase">Current</span>
                    {row.winner === "CURRENT" && <CheckmarkFilled className="text-green-700 w-4 h-4" />}
                </div>
                {row.winner === "CURRENT" && (
                    <div className="absolute top-2 right-2 md:block hidden">
                        <CheckmarkFilled className="text-green-700 w-4 h-4" />
                    </div>
                )}
                <Tooltip>
                    <TooltipTrigger className="cursor-help w-full text-left">
                        <span className={`underline decoration-dotted decoration-gray-400 underline-offset-4 ${textSize}`}>
                            {row.current.display_value}
                        </span>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-900 text-white p-4 text-sm rounded-md max-w-xs z-50 shadow-xl border border-black">
                        <TooltipRenderer value={row.current} />
                    </TooltipContent>
                </Tooltip>
            </div>

            {/* Challenger Value */}
            <div className={`p-3 md:p-4 relative transition-colors ${row.winner === "CHALLENGER" ? "bg-green-100 font-bold" : "bg-red-50"}`}>
                <div className="flex justify-between items-center md:hidden mb-1">
                    <span className="text-xs text-gray-500 uppercase">Challenger</span>
                    {row.winner === "CHALLENGER" && <CheckmarkFilled className="text-green-700 w-4 h-4" />}
                </div>
                {row.winner === "CHALLENGER" && (
                    <div className="absolute top-2 right-2 md:block hidden">
                        <CheckmarkFilled className="text-green-700 w-4 h-4" />
                    </div>
                )}
                <Tooltip>
                    <TooltipTrigger className="cursor-help w-full text-left">
                        <span className={`underline decoration-dotted decoration-gray-400 underline-offset-4 ${textSize}`}>
                            {row.challenger.display_value}
                        </span>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-900 text-white p-4 text-sm rounded-md max-w-xs z-50 shadow-xl border border-black">
                        <TooltipRenderer value={row.challenger} />
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
    );
}
