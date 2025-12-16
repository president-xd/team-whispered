import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllWriteups, getWriteupBySlug, generateTableOfContents, getAuthors } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { TableOfContents } from "@/components/mdx/TableOfContents"; // Import the new TOC component
import { ScrollToContent } from "@/components/ui/ScrollToContent";
import { Clock, Calendar } from "lucide-react";
import Link from "next/link";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

export async function generateStaticParams() {
    const writeups = getAllWriteups();
    return writeups.map((writeup) => ({
        slug: writeup.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const writeup = getWriteupBySlug(slug);

    if (!writeup) {
        return {
            title: "Writeup Not Found",
        };
    }

    return {
        title: writeup.frontmatter.title,
        description: writeup.frontmatter.summary || "CTF writeup",
        openGraph: {
            title: writeup.frontmatter.title,
            description: writeup.frontmatter.summary || "CTF writeup",
            images: writeup.frontmatter.cover ? [writeup.frontmatter.cover] : [],
        },
    };
}

export default async function WriteupPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const writeup = getWriteupBySlug(slug);

    if (!writeup) {
        notFound();
    }

    const toc = generateTableOfContents(writeup.content);

    const options = {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
                rehypeSlug,
                [
                    rehypeAutolinkHeadings,
                    {
                        behavior: "wrap",
                        properties: {
                            className: ["subheading-anchor"],
                            ariaLabel: "Link to section",
                        },
                    },
                ],
                [
                    rehypePrettyCode,
                    {
                        theme: {
                            light: "min-light",
                            dark: "github-dark",
                        },
                        keepBackground: false,
                        showLineNumbers: true,
                    },
                ],
            ],
        },
    };

    return (
        <div className="container max-w-screen-xl py-12 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* TOC Sidebar */}
                <aside className="hidden lg:block lg:col-span-3">
                    <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
                        <TableOfContents toc={toc} />
                    </div>
                </aside>

                {/* Main Content */}
                <main className="lg:col-span-9">
                    <div className="max-w-3xl">
                        <div className="relative space-y-6 border-b border-border pb-8 mb-10">
                            <Link
                                href="/writeups"
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block font-mono"
                            >
                                ← Back to Writeups
                            </Link>

                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">
                                {writeup.frontmatter.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-mono">
                                {writeup.frontmatter.date && (
                                    <span className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {formatDate(writeup.frontmatter.date)}
                                    </span>
                                )}
                                {writeup.readingTime && (
                                    <span className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        {writeup.readingTime}
                                    </span>
                                )}
                            </div>

                            {writeup.frontmatter.tags && writeup.frontmatter.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {writeup.frontmatter.tags.map((tag) => (
                                        <Badge key={tag} variant="outline" className="rounded-none">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            {/* Scroll Down Indicator */}
                            {writeup.content && <ScrollToContent />}
                        </div>

                        <div id="content-start" className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-none prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-gray-800">
                            {/* @ts-expect-error Server Component */}
                            <MDXRemote source={writeup.content} components={mdxComponents} options={options} />
                        </div>

                        {/* Authors Section */}
                        {(() => {
                            const authors = writeup.frontmatter.authors ||
                                (Array.isArray(writeup.frontmatter.writtenBy)
                                    ? writeup.frontmatter.writtenBy
                                    : writeup.frontmatter.writtenBy
                                        ? [writeup.frontmatter.writtenBy]
                                        : []);

                            if (authors.length === 0) return null;

                            return (
                                <div className="mt-16 pt-8 border-t border-border">
                                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
                                        Written by
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {getAuthors(authors).map((author) => (
                                            <div key={author.slug} className="flex items-center gap-4 group">
                                                <div className="relative w-12 h-12 overflow-hidden rounded-full border border-border group-hover:border-primary transition-colors">
                                                    {author.frontmatter.avatar ? (
                                                        <ImageFrame
                                                            src={author.frontmatter.avatar}
                                                            alt={author.frontmatter.name}
                                                            aspectRatio="square"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-muted flex items-center justify-center">
                                                            <span className="text-xs font-mono">{author.frontmatter.name.charAt(0)}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <Link href="/team" className="font-bold text-foreground group-hover:text-primary transition-colors">
                                                        {author.frontmatter.name}
                                                    </Link>
                                                    <p className="text-xs text-muted-foreground font-mono">
                                                        {author.frontmatter.role}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </main>
            </div>
        </div>
    );
}
