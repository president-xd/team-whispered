import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ImageFrame } from "@/components/ui/ImageFrame";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface TeamHighlightsProps {
    members: any[];
}

export function TeamHighlights({ members }: TeamHighlightsProps) {
    return (
        <section className="container max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-bold tracking-tight">Active Members</h2>
                <Link href="/team">
                    <Button variant="ghost" className="rounded-none group">
                        Meet the Team <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {members.slice(0, 4).map((member) => (
                    <Link key={member.slug} href="/team">
                        <Card className="text-center p-6 hover:bg-muted/50 transition-colors">
                            <ImageFrame
                                src={member.frontmatter.avatar || "/images/placeholder-avatar.png"}
                                alt={member.frontmatter.name}
                                variant="circle"
                                className="w-24 h-24 mx-auto mb-4 grayscale hover:grayscale-0 transition-all duration-300"
                            />
                            <h3 className="text-lg font-bold">{member.frontmatter.name}</h3>
                            <p className="text-sm text-primary font-mono mt-1">{member.frontmatter.role}</p>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    );
}
