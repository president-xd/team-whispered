"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
    children: string;
    language?: string;
    filename?: string;
}

export function CodeBlock({ children, language, filename }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(children);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="group relative my-6">
            {filename && (
                <div className="glass-strong rounded-t-xl px-4 py-2 text-sm text-muted-foreground font-mono border-b border-gray-200/50 dark:border-gray-700/50">
                    {filename}
                </div>
            )}
            <div className={cn("glass rounded-xl overflow-hidden", filename && "rounded-t-none")}>
                <div className="relative">
                    <button
                        onClick={handleCopy}
                        className={cn(
                            "absolute top-3 right-3 p-2 rounded-lg",
                            "glass-strong opacity-0 group-hover:opacity-100",
                            "transition-all duration-200 hover:scale-110",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        )}
                        aria-label="Copy code"
                    >
                        {copied ? (
                            <Check className="w-4 h-4 text-green-500" />
                        ) : (
                            <Copy className="w-4 h-4" />
                        )}
                    </button>
                    <pre className="p-4 overflow-x-auto">
                        <code className={cn("text-sm font-mono", language && `language-${language}`)}>
                            {children}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
}
