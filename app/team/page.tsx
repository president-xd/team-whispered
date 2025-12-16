import { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Badge } from "@/components/ui/Badge";
import { Github, Twitter, Linkedin, Trophy, Target, Shield, MapPin, Calendar, ExternalLink, Terminal } from "lucide-react";
import Link from "next/link";
import { getAllTeamMembers } from "@/lib/mdx";

export const metadata: Metadata = {
    title: "Team",
    description: "Meet the elite specialists behind our operations.",
};

export default function TeamPage() {
    const teamMembers = getAllTeamMembers();

    return (
        <div className="container py-12 md:py-24 space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Active Members</h1>
                <p className="text-muted-foreground text-lg">
                    meet the elite specialists behind our operations.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member) => (
                    <Card key={member.slug} className="group overflow-hidden hover:border-foreground/50 transition-colors duration-300">
                        <div className="p-8 flex flex-col items-center">
                            <div className="relative mb-6">
                                <ImageFrame
                                    src={member.frontmatter.avatar || "/images/placeholder-avatar.png"}
                                    alt={member.frontmatter.name}
                                    variant="square" // Minimalist square avatars
                                    className="w-32 h-32 grayscale group-hover:grayscale-0 transition-all duration-300"
                                />
                                {/* <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                                    <Badge variant="outline" className="bg-background">
                                        {member.frontmatter.role}
                                    </Badge>
                                </div> */}
                            </div>

                            <h2 className="text-2xl font-bold mb-1">{member.frontmatter.name}</h2>
                            <div className="flex items-center gap-2 text-sm text-red-500/80 mb-4 font-mono">
                                <Terminal className="w-3 h-3" />
                                <span className="uppercase tracking-widest text-xs font-semibold">{member.frontmatter.role}</span>
                            </div>

                            <p className="text-center text-muted-foreground text-sm mb-6 line-clamp-3">
                                {member.frontmatter.bio || "No bio available."}
                            </p>

                            {/* Skills/Specialties */}
                            <div className="w-full space-y-3 mb-6">
                                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground text-center">Specialties</div>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {(member.frontmatter.specialities || []).map((skill, i) => (
                                        <span key={i} className="text-[10px] font-mono border border-border px-2 py-1 bg-muted/50 transition-colors cursor-default">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Socials */}
                            <div className="flex gap-4 pt-4 border-t border-border w-full justify-center">
                                {member.frontmatter.socials?.github && (
                                    <a
                                        href={`https://github.com/${member.frontmatter.socials.github}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <Github className="w-5 h-5" />
                                    </a>
                                )}
                                {member.frontmatter.socials?.twitter && (
                                    <a
                                        href={`https://twitter.com/${member.frontmatter.socials.twitter}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <Twitter className="w-5 h-5" />
                                    </a>
                                )}
                                {member.frontmatter.socials?.linkedin && (
                                    <a
                                        href={`https://linkedin.com/in/${member.frontmatter.socials.linkedin}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Join CTA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24 max-w-5xl mx-auto">
                <Card className="p-8 flex flex-col justify-center gap-4 bg-muted/20">
                    <Target className="w-10 h-10 text-primary mb-2" />
                    <h3 className="text-2xl font-bold">Recruitment Pipeline</h3>
                    <p className="text-muted-foreground">
                        We are currently looking for reverse engineers and binary exploitation specialists.
                        Think you have what it takes?
                    </p>
                    <div className="pt-2">
                        <Link href="/join" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors inline-flex items-center gap-2">
                            Initialize Application <ExternalLink className="w-4 h-4" />
                        </Link>
                    </div>
                </Card>
                <Card className="p-8 flex flex-col justify-center gap-4 bg-muted/20">
                    <Shield className="w-10 h-10 text-primary mb-2" />
                    <h3 className="text-2xl font-bold">Research Collaboration</h3>
                    <p className="text-muted-foreground">
                        Our team actively collaborates with academic and industry partners on security research.
                    </p>
                    <div className="pt-2">
                        <a href="mailto:info@wh1sp3r3d.com" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors inline-flex items-center gap-2">
                            Contact Ops <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </Card>
            </div>
        </div>
    );
}
