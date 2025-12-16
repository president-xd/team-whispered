"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TOCItem {
    id: string;
    title: string;
    level: number;
}

interface TableOfContentsProps {
    toc: TOCItem[];
}

export function TableOfContents({ toc }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const handleScroll = () => {
            const headings = Array.from(document.querySelectorAll("h2, h3, h4"));
            const scrollPosition = window.scrollY + 150; // Offset for sticky header

            // Find the last heading that is above the current scroll position
            let currentActiveId = "";
            for (const heading of headings) {
                const element = heading as HTMLElement;
                if (element.offsetTop <= scrollPosition) {
                    currentActiveId = element.id;
                } else {
                    // Since headings are in order, once we find one below scrollPosition, we stop
                    break;
                }
            }

            if (currentActiveId) setActiveId(currentActiveId);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    if (!toc?.length) return null;

    return (
        <nav className="space-y-2 text-sm">
            <p className="font-semibold mb-4 text-foreground/80">Table of Contents</p>
            {toc.map((item) => (
                <a
                    key={item.id}
                    href={`#${item.id}`}
                    style={{
                        paddingLeft: `${(item.level - 2) * 16 + (activeId === item.id ? 10 : 8)}px`,
                    }}
                    className={cn(
                        "block transition-colors hover:text-foreground",
                        activeId === item.id
                            ? "text-foreground font-medium border-l-2 border-foreground -ml-[2px]"
                            : "text-muted-foreground border-l-2 border-transparent"
                    )}
                    onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(item.id);
                        if (el) {
                            window.scrollTo({
                                top: el.offsetTop - 100, // Offset for sticky header
                                behavior: "smooth",
                            });
                            // Update active ID immediately on click for better responsiveness
                            setActiveId(item.id);
                        }
                    }}
                >
                    {item.title}
                </a>
            ))}
        </nav>
    );
}
