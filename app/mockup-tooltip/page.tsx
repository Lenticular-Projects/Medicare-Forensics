"use client";

import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { CheckmarkFilled, TrophyFilled } from "@carbon/icons-react";

export default function MockupTooltipPage() {
    return (
        <div className="min-h-screen bg-white p-12 font-sans flex flex-col items-center">
            <div className="max-w-4xl w-full">
                <h1 className="text-3xl font-black uppercase tracking-tight mb-4 border-b-4 border-black pb-2">
                    Rich Tooltip Prototype v2
                    <span className="text-sm font-normal normal-case block text-gray-500 mt-2">
                        Hover over values to see the expanded "Risk & Benefit Context".
                    </span>
                </h1>

                <div className="border border-black mt-8">
                    {/* Header */}
                    <div className="grid grid-cols-3 border-b border-black bg-gray-50">
                        <div className="p-4 font-bold uppercase text-xs tracking-wider border-r border-black flex items-center">
                            Category
                        </div>
                        <div className="p-4 border-r border-black font-bold text-xl uppercase tracking-tight">
                            Current Plan
                        </div>
                        <div className="p-4 font-bold text-xl uppercase tracking-tight">
                            Aetna Value Plus
                        </div>
                    </div>

                    <TooltipProvider delayDuration={0}>
                        {/* ROW 1: Dental */}
                        <div className="grid grid-cols-3 border-b border-black">
                            <div className="p-4 bg-white border-r border-black font-semibold text-sm uppercase tracking-wide flex items-center">
                                Dental Allowance
                            </div>

                            {/* Current */}
                            <div className="p-4 border-r border-black bg-green-100 font-bold relative">
                                <div className="flex justify-between items-center md:hidden mb-1">
                                    <span className="text-xs text-gray-500 uppercase">Current</span>
                                    <CheckmarkFilled className="text-green-700 w-4 h-4" />
                                </div>
                                <div className="absolute top-2 right-2 md:block hidden">
                                    <CheckmarkFilled className="text-green-700 w-4 h-4" />
                                </div>
                                <Tooltip>
                                    <TooltipTrigger className="cursor-help text-left">
                                        <span className="underline decoration-dotted decoration-gray-400 underline-offset-4 text-lg">
                                            $4,000/yr
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-gray-900 text-white p-4 text-sm rounded-md max-w-xs z-50 shadow-xl border border-black">
                                        <p className="font-bold text-green-400 mb-2 uppercase tracking-wider text-xs border-b border-gray-700 pb-1">Comprehensive Coverage</p>
                                        <ul className="list-disc pl-4 space-y-1 text-gray-200">
                                            <li><strong>Preventive:</strong> $0 Copay (Cleanings, X-Rays)</li>
                                            <li><strong>Complex:</strong> $0 Copay for Crowns, Root Canals, & Dentures.</li>
                                            <li><strong>Network:</strong> Liberty Dental (National Access).</li>
                                            <li><strong className="text-white">Implants:</strong> Covered (2 per year).</li>
                                        </ul>
                                    </TooltipContent>
                                </Tooltip>
                            </div>

                            {/* Challenger */}
                            <div className="p-4 bg-red-50 text-gray-700 relative">
                                <Tooltip>
                                    <TooltipTrigger className="cursor-help text-left">
                                        <span className="underline decoration-dotted decoration-gray-400 underline-offset-4 text-lg">
                                            $3,000/yr
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-gray-900 text-white p-4 text-sm rounded-md max-w-xs z-50 shadow-xl border border-black">
                                        <p className="font-bold text-red-400 mb-2 uppercase tracking-wider text-xs border-b border-gray-700 pb-1">Coverage Gaps Detected</p>
                                        <ul className="list-disc pl-4 space-y-1 text-gray-200">
                                            <li><strong>Preventive:</strong> $0 Copay.</li>
                                            <li><strong>Complex:</strong> You pay 50% coinsurance.</li>
                                            <li><strong>Annual Cap:</strong> Benefits stop after $3,000.</li>
                                            <li><strong className="text-red-300">Implants:</strong> NOT Covered.</li>
                                        </ul>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </div>

                        {/* ROW 2: OTC */}
                        <div className="grid grid-cols-3 border-b border-black">
                            <div className="p-4 bg-white border-r border-black font-semibold text-sm uppercase tracking-wide flex items-center">
                                Over-the-Counter
                            </div>

                            {/* Current */}
                            <div className="p-4 border-r border-black bg-green-100 font-bold relative">
                                <div className="absolute top-2 right-2 md:block hidden">
                                    <CheckmarkFilled className="text-green-700 w-4 h-4" />
                                </div>
                                <Tooltip>
                                    <TooltipTrigger className="cursor-help text-left">
                                        <span className="underline decoration-dotted decoration-gray-400 underline-offset-4 text-lg">
                                            $349/mo
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-gray-900 text-white p-4 text-sm rounded-md max-w-xs z-50 shadow-xl border border-black">
                                        <p className="font-bold text-green-400 mb-2 uppercase tracking-wider text-xs border-b border-gray-700 pb-1">Unicorn Benefit</p>
                                        <p className="mb-2">This is a rare "Flex" allowance.</p>
                                        <ul className="list-disc pl-4 space-y-1 text-gray-200">
                                            <li>Healthy Food (Groceries)</li>
                                            <li>Utilities (Electric/Gas/Water)</li>
                                            <li>Rent Assistance</li>
                                            <li><strong>Rollover:</strong> Unused credits roll over to next month.</li>
                                        </ul>
                                    </TooltipContent>
                                </Tooltip>
                            </div>

                            {/* Challenger */}
                            <div className="p-4 bg-red-50 text-gray-700 relative">
                                <Tooltip>
                                    <TooltipTrigger className="cursor-help text-left">
                                        <span className="underline decoration-dotted decoration-gray-400 underline-offset-4 text-lg">
                                            $229/mo
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-gray-900 text-white p-4 text-sm rounded-md max-w-xs z-50 shadow-xl border border-black">
                                        <p className="font-bold text-gray-400 mb-2 uppercase tracking-wider text-xs border-b border-gray-700 pb-1">Standard Benefit</p>
                                        <ul className="list-disc pl-4 space-y-1 text-gray-200">
                                            <li>Standard OTC Meds & Bandages only.</li>
                                            <li><strong className="text-red-300">Excludes:</strong> Food, Utilities, Rent.</li>
                                            <li><strong>Use it or Lose it:</strong> No rollover.</li>
                                        </ul>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </div>

                        {/* ROW 3: Transportation */}
                        <div className="grid grid-cols-3 border-b border-black">
                            <div className="p-4 bg-white border-r border-black font-semibold text-sm uppercase tracking-wide flex items-center">
                                Transportation
                            </div>

                            {/* Current */}
                            <div className="p-4 border-r border-black bg-green-100 font-bold relative">
                                <div className="absolute top-2 right-2 md:block hidden">
                                    <CheckmarkFilled className="text-green-700 w-4 h-4" />
                                </div>
                                <Tooltip>
                                    <TooltipTrigger className="cursor-help text-left">
                                        <span className="underline decoration-dotted decoration-gray-400 underline-offset-4 text-lg">
                                            72 Rides
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-gray-900 text-white p-4 text-sm rounded-md max-w-xs z-50 shadow-xl border border-black">
                                        <p className="font-bold text-gray-400 mb-2 uppercase tracking-wider text-xs border-b border-gray-700 pb-1">Medical & Non-Medical</p>
                                        <ul className="list-disc pl-4 space-y-1 text-gray-200">
                                            <li>72 One-way trips per year.</li>
                                            <li>Can be used for Doctor, Pharmacy, OR Gym.</li>
                                            <li>Wheelchair accessible vans included.</li>
                                        </ul>
                                    </TooltipContent>
                                </Tooltip>
                            </div>

                            {/* Challenger */}
                            <div className="p-4 bg-red-50 text-gray-700 relative">
                                <Tooltip>
                                    <TooltipTrigger className="cursor-help text-left">
                                        <span className="underline decoration-dotted decoration-gray-400 underline-offset-4 text-lg">
                                            36 Rides
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-gray-900 text-white p-4 text-sm rounded-md max-w-xs z-50 shadow-xl border border-black">
                                        <p className="font-bold text-gray-400 mb-2 uppercase tracking-wider text-xs border-b border-gray-700 pb-1">Restricted Access</p>
                                        <ul className="list-disc pl-4 space-y-1 text-gray-200">
                                            <li>36 One-way trips only.</li>
                                            <li><strong>Strictly Medical:</strong> Doctor appointments only.</li>
                                            <li>No Gym or Pharmacy stops allowed.</li>
                                        </ul>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </div>

                        {/* ROW 4: Ambulance (Forensic) */}
                        <div className="bg-black text-white p-2 text-center text-xs font-bold uppercase tracking-[0.2em]">
                            Detailed Forensic Evidence
                        </div>
                        <div className="grid grid-cols-3 border-b border-black">
                            <div className="p-4 bg-white border-r border-black font-semibold text-xs uppercase tracking-wide flex items-center text-gray-600">
                                Ambulance Copay
                            </div>

                            {/* Current */}
                            <div className="p-4 border-r border-black bg-white font-bold relative">
                                <Tooltip>
                                    <TooltipTrigger className="cursor-help text-left">
                                        <span className="underline decoration-dotted decoration-gray-400 underline-offset-4 text-base">
                                            $0
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-gray-900 text-white p-4 text-sm rounded-md max-w-xs z-50 shadow-xl border border-black">
                                        <p><strong>$0 Copay</strong> applies to both Emergency Ground and Air transport.</p>
                                        <p className="mt-2 text-gray-400 text-xs text-center border-t border-gray-700 pt-2">Waived if admitted to hospital.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>

                            {/* Challenger */}
                            <div className="p-4 bg-white text-gray-700 relative">
                                <Tooltip>
                                    <TooltipTrigger className="cursor-help text-left">
                                        <span className="underline decoration-dotted decoration-gray-400 underline-offset-4 text-base">
                                            20%
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-gray-900 text-white p-4 text-sm rounded-md max-w-xs z-50 shadow-xl border border-black">
                                        <p className="font-bold text-red-300 mb-1">High Cost Risk</p>
                                        <p>You pay 20% coinsurance.</p>
                                        <p className="mt-1 text-xs text-gray-300"><i>Example: On a $1,000 ride, you pay $200.</i></p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </div>

                    </TooltipProvider>
                </div>
            </div>
        </div>
    );
}
