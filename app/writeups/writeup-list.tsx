"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Calendar, Clock, Tag, Search, ArrowRight } from "lucide-react";
import { MDXContent } from "@/lib/mdx";

interface WriteupListProps {
    writeups: MDXContent[];
}

export function WriteupList({ writeups }: WriteupListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // Get all unique tags
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        writeups.forEach(writeup => {
            writeup.frontmatter.tags?.forEach(tag => tags.add(tag));
        });
        return Array.from(tags).sort();
    }, [writeups]);

    const filteredWriteups = useMemo(() => {
        return writeups.filter(writeup => {
            // Search filter
            const matchesSearch =
                writeup.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                writeup.frontmatter.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                false;

            // Tag filter
            const matchesTags =
                selectedTags.length === 0 ||
                selectedTags.every(tag => writeup.frontmatter.tags?.includes(tag));

            return matchesSearch && matchesTags;
        });
    }, [writeups, searchQuery, selectedTags]);

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                <div className="space-y-4 text-center md:text-left">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Writeups</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        detailed ctf walkthroughs and security analysis reports.
                    </p>
                </div>

                <div className="relative w-full md:w-auto min-w-[300px]">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Search className="w-4 h-4" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search intelligence..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 pl-10 pr-4 rounded-none border border-input bg-background/50 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>
            </div>

            {/* Filter Tags */}
            {allTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`px-3 py-1 rounded-full text-xs font-mono border transition-colors ${selectedTags.includes(tag)
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-background text-muted-foreground border-border hover:border-foreground"
                                }`}
                        >
                            #{tag}
                        </button>
                    ))}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWriteups.length > 0 ? (
                    filteredWriteups.map((writeup) => (
                        <Link key={writeup.slug} href={`/writeups/${writeup.slug}`} className="group">
                            <Card className="h-full flex flex-col overflow-hidden hover:border-foreground/50 transition-colors">
                                <div className="aspect-video relative overflow-hidden bg-muted border-b border-border">
                                    {writeup.frontmatter.cover ? (
                                        <ImageFrame
                                            src={writeup.frontmatter.cover}
                                            alt={writeup.frontmatter.title}
                                            aspectRatio="video"
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-muted">
                                            <Tag className="w-12 h-12 text-muted-foreground/20" />
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2">
                                        <Badge className="bg-background text-foreground border-border shadow-sm">
                                            {writeup.frontmatter.tags?.[0] || 'Intel'}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col gap-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {writeup.frontmatter.date}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {writeup.readingTime}
                                            </div>
                                        </div>

                                        <h2 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                                            {writeup.frontmatter.title}
                                        </h2>

                                        <p className="text-muted-foreground text-sm line-clamp-2">
                                            {writeup.frontmatter.summary}
                                        </p>
                                    </div>

                                    <div className="mt-auto pt-4 flex items-center justify-between">
                                        <div className="flex gap-2">
                                            {writeup.frontmatter.tags?.slice(1, 3).map(tag => (
                                                <span key={tag} className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 border border-border">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                        <ArrowRight className="w-4 h-4 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-primary" />
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        No operations found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
}
