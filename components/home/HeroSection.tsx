import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export function HeroSection() {
    return (
        <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 px-4 overflow-hidden">
            {/* Abstract Background Element (Minimalist) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />

            <div className="container max-w-5xl mx-auto text-center space-y-8 relative z-10">
                <Badge variant="outline" className="mb-4">
                    Established 2025
                </Badge>

                <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-foreground">
                    wh1s<span className="text-muted-foreground">p3r3d</span>
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Elite CTF team specializing in web exploitation, cryptography, and binary analysis.
                    We break things to make them stronger.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                    <Link href="/writeups">
                        <Button size="lg" className="min-w-[160px] font-bold rounded-none">
                            Read Writeups
                        </Button>
                    </Link>
                    <Link href="/join">
                        <Button size="lg" variant="outline" className="min-w-[160px] font-bold rounded-none">
                            Join Us
                        </Button>
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-y border-border mt-16 divide-y md:divide-y-0 md:divide-x divide-border">
                    <div className="p-8">
                        <div className="text-4xl font-mono font-bold text-foreground">15+</div>
                        <div className="text-sm text-muted-foreground mt-2 uppercase tracking-widest">CTF Played</div>
                    </div>
                    <div className="p-8">
                        <div className="text-4xl font-mono font-bold text-foreground">10+</div>
                        <div className="text-sm text-muted-foreground mt-2 uppercase tracking-widest">Writeups</div>
                    </div>
                    <div className="p-8">
                        <div className="text-4xl font-mono font-bold text-foreground">Global</div>
                        <div className="text-sm text-muted-foreground mt-2 uppercase tracking-widest">Ranking</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
