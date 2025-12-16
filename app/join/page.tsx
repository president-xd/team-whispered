import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Terminal, Cpu, Flag, CheckCircle2 } from "lucide-react";

export const metadata = {
    title: "Join Us",
    description: "Apply to become a member of the elite wh1sp3r3d.",
};

export default function JoinPage() {
    return (
        <div className="container py-12 md:py-24 max-w-6xl mx-auto space-y-16">

            <div className="text-center max-w-3xl mx-auto space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                    Join the &quot;Elites&quot;
                </h1>
                <p className="text-muted-foreground mb-6">
                    We&apos;re looking for passionate individuals who love solving complex puzzles.
                    Whether you&apos;re a binary exploitation wizard or a cryptography enthusiast,
                    there&apos;s a place for you here.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Requirements */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold border-b border-border pb-2">Prerequisites</h2>

                    <div className="grid gap-6">
                        <div className="flex gap-4">
                            <div className="mt-1"><Terminal className="w-6 h-6 text-primary" /></div>
                            <div>
                                <h3 className="font-bold text-lg">Technical Competence</h3>
                                <p className="text-muted-foreground text-sm mt-1">
                                    Demonstrated ability in at least one CTF category (Web, Pwn, Crypto, Rev, Forensics).
                                    We don't need experts in everything, but mastery in something.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="mt-1"><Cpu className="w-6 h-6 text-primary" /></div>
                            <div>
                                <h3 className="font-bold text-lg">Problem Solving</h3>
                                <p className="text-muted-foreground text-sm mt-1">
                                    Ability to think laterally and persevere through difficult challenges.
                                    "Try Harder" isn't just a slogan, it's a requirement.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="mt-1"><Flag className="w-6 h-6 text-primary" /></div>
                            <div>
                                <h3 className="font-bold text-lg">Team Cooperation</h3>
                                <p className="text-muted-foreground text-sm mt-1">
                                    CTFs are a team sport. Communication and knowledge sharing are critical.
                                    Lone wolves need not apply.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Application Form Placeholder */}
                <Card variant="outline" className="p-8 border-border bg-card">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold">New Recruit Application</h2>
                            <p className="font-medium">Why do you want to join wh1sp3r3d? What&apos;s your area of expertise?</p>
                        </div>

                        <form className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="handle" className="text-sm font-medium">Alias / Handle</label>
                                    <input id="handle" className="flex h-10 w-full rounded-none border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="ZeroCool" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">Comms Channel (Email)</label>
                                    <input id="email" type="email" className="flex h-10 w-full rounded-none border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="hack@example.com" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="ctftime" className="text-sm font-medium">CTFtime Profile URL</label>
                                <input id="ctftime" className="flex h-10 w-full rounded-none border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="https://ctftime.org/team/..." />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="specialties" className="text-sm font-medium">Primary Specialization</label>
                                <select id="specialties" className="flex h-10 w-full rounded-none border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                                    <option>Web Exploitation</option>
                                    <option>Reverse Engineering</option>
                                    <option>Binary Exploitation</option>
                                    <option>Cryptography</option>
                                    <option>Forensics</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">Why Join Us?</label>
                                <textarea id="message" className="flex min-h-[100px] w-full rounded-none border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Tell us about your proudest flag capture..." />
                            </div>

                            <Button type="submit" className="w-full">
                                Transmit Application
                            </Button>
                        </form>
                    </div>
                </Card>
            </div>

            {/* Benefits */}
            <div className="space-y-8 pt-12 border-t border-border">
                <h2 className="text-2xl font-bold text-center">Team Directives</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        "Access to private infrastructure and labs",
                        "Sponsorship for major conferences",
                        "Internal knowledge base and training",
                        "Private exploits and toolkits",
                        "Weekly training sessions",
                        "Exclusive team merchandise"
                    ].map((benefit, i) => (
                        <Card key={i} className="p-4 flex items-start gap-3 bg-muted/20 border-none">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm">{benefit}</span>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="text-center pt-8">
                <Card className="inline-block p-8 border-dashed bg-transparent hover:border-solid transition-all">
                    <p className="text-muted-foreground text-sm font-mono mb-2">
                    // Do not attempt to exploit this form.
                    // We will know.
                    </p>
                </Card>
            </div>

        </div>
    );
}
