import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { getAllWriteups, getAllTeamMembers } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, Trophy, Users, FileText, Terminal } from "lucide-react";

export default function HomePage() {
  const writeups = getAllWriteups().slice(0, 3);
  const teamMembers = getAllTeamMembers().slice(0, 4);

  return (
    <div className="flex flex-col gap-16 md:gap-24 relative overflow-hidden">
      {/* Hero Section */}
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

      {/* Latest Writeups */}
      <section className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Latest Posts</h2>
          <Link href="/writeups">
            <Button variant="ghost" className="rounded-none group">
              View All <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {writeups.map((post) => (
            <Link key={post.slug} href={`/writeups/${post.slug}`} className="group">
              <Card className="h-full hover:border-foreground/50 transition-colors">
                <div className="aspect-video relative overflow-hidden bg-muted">
                  {post.frontmatter.cover ? (
                    <ImageFrame
                      src={post.frontmatter.cover}
                      alt={post.frontmatter.title}
                      aspectRatio="video"
                      className="bg-muted grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <Terminal className="w-12 h-12 opacity-20" />
                    </div>
                  )}
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                      <span>{post.frontmatter.date && formatDate(post.frontmatter.date)}</span>
                    </div>
                    <h3 className="text-xl font-bold leading-tight line-clamp-2">
                      {post.frontmatter.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2 text-sm">
                      {post.frontmatter.summary}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.frontmatter.tags?.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Team Highlights */}
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
          {teamMembers.slice(0, 4).map((member) => (
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

      {/* CTA / Sponsors */}
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
    </div>
  );
}
