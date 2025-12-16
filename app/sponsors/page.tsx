import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { getAllSponsors } from "@/lib/mdx";
import Link from "next/link";
import { ExternalLink, Handshake, Mail } from "lucide-react";

export const metadata = {
    title: "Sponsors",
    description: "Our partners and sponsors who support our security research.",
};

export default function SponsorsPage() {
    const sponsors = getAllSponsors();
    const platinumSponsors = sponsors.filter((s) => s.frontmatter.tier === 'platinum');
    const goldSponsors = sponsors.filter((s) => s.frontmatter.tier === 'gold');
    const silverSponsors = sponsors.filter((s) => s.frontmatter.tier === 'silver');
    const bronzeSponsors = sponsors.filter((s) => s.frontmatter.tier === 'bronze');
    return (
        <div className="container py-12 md:py-24 space-y-24">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Sponsors</h1>
                <p className="text-muted-foreground text-lg">
                    we are proud to be supported by industry leaders in cybersecurity and technology.
                    their partnership enables our research and competitive operations.
                </p>
            </div>

            {/* Tiers */}
            <div className="space-y-16">
                {/* Platinum Tier */}
                {platinumSponsors.length > 0 && (
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 justify-center">
                            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent w-full max-w-[100px]" />
                            <h2 className="text-2xl font-bold tracking-widest uppercase">Platinum Partners</h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent w-full max-w-[100px]" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {platinumSponsors.map(sponsor => (
                                <Card key={sponsor.slug} className="p-8 flex flex-col items-center text-center gap-6 hover:border-foreground/50 transition-colors">

                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-bold">{sponsor.frontmatter.name}</h3>
                                        <p className="text-muted-foreground">{sponsor.frontmatter.description}</p>
                                        <a href={sponsor.frontmatter.url} target="_blank" rel="noreferrer">
                                            <Button variant="outline" className="mt-2 w-full">
                                                Visit Partner <ExternalLink className="ml-2 w-4 h-4" />
                                            </Button>
                                        </a>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Gold Tier */}
                {goldSponsors.length > 0 && (
                    <div className="space-y-8">
                        <h2 className="text-xl font-bold tracking-widest uppercase text-center text-muted-foreground">Gold Partners</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {goldSponsors.map(sponsor => (
                                <Card key={sponsor.slug} className="p-6 flex flex-col items-center text-center gap-4 hover:border-foreground/50 transition-colors">

                                    <div>
                                        <h3 className="text-lg font-bold">{sponsor.frontmatter.name}</h3>
                                        {sponsor.frontmatter.website && (
                                            <a href={sponsor.frontmatter.website} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-1 text-sm mt-2">
                                                {sponsor.frontmatter.website.replace(/^https?:\/\//, '').replace(/\/$/, '')} <ExternalLink className="w-3 h-3" />
                                            </a>
                                        )}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Become a Sponsor */}
            <section className="container max-w-4xl mx-auto px-4">
                <Card variant="outline" className="text-center py-16 px-6 bg-muted/30">
                    <Handshake className="w-12 h-12 mx-auto mb-6 text-foreground" />
                    <h2 className="text-3xl font-bold mb-4">Join the Alliance</h2>
                    <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                        partnering with wh1sp3r3d connects your brand with the next generation of security researchers and elite ethical hackers.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="mailto:sponsors@wh1sp3r3d.com">
                            <Button size="lg" className="rounded-none">
                                <Mail className="mr-2 w-4 h-4" /> Request Prospectus
                            </Button>
                        </Link>
                    </div>
                </Card>
            </section>
        </div>
    );
}
