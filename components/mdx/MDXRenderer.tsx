"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { mdxComponents } from "./MDXComponents";

interface MDXRendererProps {
    source: MDXRemoteSerializeResult;
}

export function MDXRenderer({ source }: MDXRendererProps) {
    return (
        <div className="prose prose-lg dark:prose-invert max-w-none">
            <MDXRemote {...source} components={mdxComponents} />
        </div>
    );
}
