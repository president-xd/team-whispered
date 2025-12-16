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
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0px 0px -80% 0px" }
        );

        const headings = document.querySelectorAll("h2, h3, h4");
        headings.forEach((heading) => observer.observe(heading));

        return () => {
            headings.forEach((heading) => observer.unobserve(heading));
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
