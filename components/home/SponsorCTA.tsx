import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { Trophy } from "lucide-react";

export function SponsorCTA() {
    return (
        <section className="container max-w-4xl mx-auto px-4 mb-24">
            <Card variant="outline" className="text-center py-16 px-4 bg-muted/30">
                <Trophy className="w-12 h-12 mx-auto mb-6 text-foreground" />
                <h2 className="text-3xl font-bold mb-4">Ready to collaborate?</h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                    We are always looking for partners and new challenges.
                    Connect with us to discuss security research or sponsorship opportunities.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/sponsors">
                        <Button className="rounded-none">Become a Sponsor</Button>
                    </Link>
                    <a href="mailto:info@wh1sp3r3d.com">
                        <Button variant="outline" className="rounded-none">Contact Us</Button>
                    </a>
                </div>
            </Card>
        </section>
    );
}
