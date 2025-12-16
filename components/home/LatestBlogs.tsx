import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";

interface LatestBlogsProps {
    Blogs: any[]; // Using any for simplicity as strictly typing Frontmatter can be complex depending on setup, but ideally should be typed
}

export function LatestBlogs({ Blogs }: LatestBlogsProps) {
    return (
        <section className="container max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-bold tracking-tight">Latest Posts</h2>
                <Link href="/Blogs">
                    <Button variant="ghost" className="rounded-none group">
                        View All <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Blogs.map((post) => (
                    <Link key={post.slug} href={`/Blogs/${post.slug}`} className="group">
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
                                    {post.frontmatter.tags?.slice(0, 3).map((tag: string) => (
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
    );
}
