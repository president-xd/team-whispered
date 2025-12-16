"use client";

import { useState, useRef } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export const Pre = ({ children, className, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    const [isCopied, setIsCopied] = useState(false);
    const preRef = useRef<HTMLPreElement>(null);

    const onCopy = async () => {
        if (!preRef.current) return;

        // Clone the node to manipulate it without affecting the DOM
        const clone = preRef.current.cloneNode(true) as HTMLElement;

        // Remove line numbers if they exist (usually elements with data-line-number or user-select-none)
        // rehype-pretty-code often uses spans for lines. We want the text content.
        // A simple textContent might gather line numbers if they are just text.
        // Let's assume standard behavior first or try to extract from 'code' element.

        const codeElement = clone.querySelector("code");
        const text = codeElement ? codeElement.innerText : clone.innerText;

        await navigator.clipboard.writeText(text);
        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    return (
        <div className="my-6 rounded-lg border border-border overflow-hidden dark:bg-[#10100E]">
            {/* Section 1: Header */}
            <div className="flex items-center justify-between px-4 py-1 bg-muted/50 border-b border-border">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" />
                </div>
                <button
                    onClick={onCopy}
                    className="p-1.5 rounded-md hover:bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                    aria-label="Copy code"
                >
                    {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-green-500" />
                    ) : (
                        <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                    )}
                </button>
            </div>

            {/* Section 2: Code */}
            <div className="relative">
                <pre
                    {...props}
                    ref={preRef}
                    className={cn(
                        "rounded-none border-none bg-transparent text-sm overflow-x-auto p-4",
                        className
                    )}
                >
                    {children}
                </pre>
            </div>
        </div>
    );
};
