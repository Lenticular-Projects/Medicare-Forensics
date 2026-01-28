"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-24 h-8 rounded-full bg-secondary animate-pulse" />;
    }

    return (
        <div className="fixed top-6 right-6 z-50">
            <div className="flex items-center p-1 rounded-full border border-border bg-background/80 backdrop-blur-sm shadow-sm">
                <button
                    onClick={() => setTheme("system")}
                    className={cn(
                        "flex items-center justify-center size-7 rounded-full transition-all duration-200",
                        theme === "system"
                            ? "bg-muted text-foreground font-medium shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                    title="System Theme"
                >
                    <Monitor className="size-4" />
                </button>
                <button
                    onClick={() => setTheme("light")}
                    className={cn(
                        "flex items-center justify-center size-7 rounded-full transition-all duration-200",
                        theme === "light"
                            ? "bg-muted text-foreground font-medium shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                    title="Light Mode"
                >
                    <Sun className="size-4" />
                </button>
                <button
                    onClick={() => setTheme("dark")}
                    className={cn(
                        "flex items-center justify-center size-7 rounded-full transition-all duration-200",
                        theme === "dark"
                            ? "bg-muted text-foreground font-medium shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                    title="Dark Mode"
                >
                    <Moon className="size-4" />
                </button>
            </div>
        </div>
    );
}
