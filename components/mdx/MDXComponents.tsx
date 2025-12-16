import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { CodeBlock } from "./CodeBlock"; // This import will become unused
import { Callout } from "./Callout";
import { Pre } from "./Pre";
import { ResponsiveTable } from "./ResponsiveTable"; // This import will become unused
import { cn } from "@/lib/utils"; // Assuming `cn` utility is available here

export const mdxComponents = {
    // Headings
    h1: (props: any) => (
        <h1
            className="text-4xl font-bold mt-8 mb-4 tracking-tight"
            {...props}
        />
    ),
    h2: ({ className, ...props }: any) => (
        <h2
            className={cn(
                "mt-10 scroll-m-20 border-b border-b-muted pb-1 text-3xl font-semibold tracking-tight first:mt-0",
                className
            )}
            {...props}
        />
    ),
    h3: ({ className, ...props }: any) => (
        <h3
            className={cn(
                "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
                className
            )}
            {...props}
        />
    ),
    h4: ({ className, ...props }: any) => (
        <h4
            className={cn(
                "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
                className
            )}
            {...props}
        />
    ),
    h5: ({ className, ...props }: any) => (
        <h5
            className={cn(
                "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
                className
            )}
            {...props}
        />
    ),
    h6: ({ className, ...props }: any) => (
        <h6
            className={cn(
                "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
                className
            )}
            {...props}
        />
    ),

    // Paragraphs and text
    p: ({ className, ...props }: any) => (
        <p
            className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
            {...props}
        />
    ),

    // Lists
    ul: ({ className, ...props }: any) => (
        <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props} />
    ),
    ol: ({ className, ...props }: any) => (
        <ol className={cn("my-6 ml-6 list-decimal [&>li]:mt-2", className)} {...props} />
    ),
    li: ({ className, ...props }: any) => (
        <li className={cn("mt-2", className)} {...props} />
    ),

    // Links
    a: ({ className, ...props }: any) => (
        <a
            className={cn("font-medium underline underline-offset-4", className)}
            {...props}
        />
    ),



    // Blockquote
    blockquote: ({ className, ...props }: any) => (
        <blockquote
            className={cn(
                "mt-6 border-l-2 pl-6 italic text-muted-foreground",
                className
            )}
            {...props}
        />
    ),

    // Images
    img: ({
        className,
        alt,
        ...props
    }: React.ImgHTMLAttributes<HTMLImageElement>) => (
        <Image
            className={cn("rounded-md border", className)}
            alt={alt || "Blog Image"}
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
            style={{ width: "100%", height: "auto" }}
            {...(props as any)}
        />
    ),

    // Horizontal rule
    hr: ({ ...props }: any) => <hr className="my-4 md:my-8" {...props} />,

    // Table
    table: (props: any) => <ResponsiveTable {...props} />,

    // Custom components
    Callout,
    CodeBlock,
    pre: Pre,
};
