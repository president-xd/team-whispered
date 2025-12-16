"use client";

import { ChevronDown } from "lucide-react";

export function ScrollToContent() {
    return (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center print:hidden animate-bounce">
            <button
                onClick={() => {
                    const contentStart = document.getElementById("content-start");
                    if (contentStart) {
                        contentStart.scrollIntoView({ behavior: "smooth" });
                    }
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Scroll to content"
            >
                <ChevronDown className="w-6 h-6" />
            </button>
        </div>
    );
}
