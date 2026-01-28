"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import {
    WarningFilled,
    CheckmarkFilled,
    WarningAltFilled,
    Security,
    Money
} from "@carbon/icons-react";

interface VerdictCardProps {
    verdict: "STAY" | "SWITCH";
    verdictTitle: string;
    override?: boolean;
    annualDifference?: number; // Made optional
    summary: string;
}

function Counter({ value, currency = "$" }: { value: number, currency?: string }) {
    const spring = useSpring(0, { bounce: 0, duration: 1000 });
    const display = useTransform(spring, (current) =>
        currency + Math.abs(Math.round(current)).toLocaleString()
    );

    useEffect(() => {
        spring.set(value);
    }, [spring, value]);

    return <motion.span>{display}</motion.span>;
}

export default function VerdictCard({
    verdict,
    verdictTitle,
    override = false, // Default to false
    annualDifference,
    summary,
}: VerdictCardProps) {
    const isSwitch = verdict === "SWITCH";

    // Decide Icon
    const Icon = override
        ? WarningAltFilled
        : isSwitch
            ? CheckmarkFilled
            : Security;

    // Decide Color Theme
    const bgColor = override
        ? "bg-yellow-100"
        : isSwitch
            ? "bg-green-100"
            : "bg-gray-100";

    const borderColor = "border-black";
    const textColor = "text-black";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`w-full border ${borderColor} rounded-none overflow-hidden mb-8`}
        >
            {/* Override Banner */}
            {override && (
                <div className="bg-yellow-300 border-b border-black p-3 flex items-center gap-3">
                    <WarningAltFilled className="w-5 h-5 text-black" />
                    <span className="font-bold text-sm uppercase tracking-wide">
                        RECOMMENDATION BLOCKED: Doctor network conflict
                    </span>
                </div>
            )}

            <div className={`p-6 md:p-8 ${bgColor}`}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

                    {/* Verdict Header */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <Icon className="w-8 h-8 md:w-10 md:h-10 text-black" />
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
                                {verdict}
                            </h2>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold mb-4 leading-tight">
                            {verdictTitle}
                        </h3>
                        <p className="font-serif text-lg leading-relaxed max-w-2xl opacity-90">
                            {summary}
                        </p>
                    </div>

                    {/* Economic Delta - Only show if we have it */}
                    {annualDifference !== undefined && (
                        <div className="bg-white/50 border border-black p-4 min-w-[200px] flex flex-col items-center justify-center">
                            <div className="flex items-center gap-2 mb-1 text-sm font-bold uppercase tracking-wider opacity-70">
                                <Money className="w-4 h-4" />
                                Annual Impact
                            </div>
                            <div className={`text-3xl font-black ${annualDifference > 0 ? "text-green-700" : "text-gray-900"}`}>
                                {annualDifference > 0 ? "+" : "-"}
                                <Counter value={annualDifference} />
                                <span className="text-sm font-normal ml-1 text-gray-500">/yr</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
