import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const contentDirectory = path.join(process.cwd(), "content");

export interface Frontmatter {
    title: string;
    date?: string;
    tags?: string[];
    authors?: string[];
    writtenBy?: string | string[];
    summary?: string;
    cover?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export interface MDXContent<T = Frontmatter> {
    slug: string;
    frontmatter: T;
    content: string;
    readingTime?: string;
}

export interface TableOfContentsItem {
    id: string;
    title: string;
    level: number;
}

function getContentFiles(dir: string): string[] {
    const fullPath = path.join(contentDirectory, dir);
    if (!fs.existsSync(fullPath)) {
        return [];
    }
    return fs.readdirSync(fullPath).filter((file) => file.endsWith(".mdx"));
}

function parseContent<T = Frontmatter>(
    filePath: string
): Omit<MDXContent<T>, "slug"> {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    const stats = readingTime(content);

    return {
        frontmatter: data as T,
        content,
        readingTime: stats.text,
    };
}

export function getAllBlogs(): MDXContent[] {
    const files = getContentFiles("Blogs");

    const Blogs: MDXContent[] = [];

    files.forEach((file) => {
        const slug = file.replace(/\.mdx$/, "");
        const filePath = path.join(contentDirectory, "Blogs", file);
        try {
            const { frontmatter, content, readingTime } = parseContent(filePath);
            Blogs.push({
                slug,
                frontmatter,
                content,
                readingTime,
            });
        } catch (_error) {
            console.error(`Error parsing MDX file ${file}:`, _error);
        }
    });

    // Sort by date, newest first
    return Blogs.sort((a, b) => {
        const dateA = a.frontmatter.date ? new Date(a.frontmatter.date) : new Date(0);
        const dateB = b.frontmatter.date ? new Date(b.frontmatter.date) : new Date(0);
        return dateB.getTime() - dateA.getTime();
    });
}

export function getWriteupBySlug(slug: string): MDXContent | null {
    try {
        const filePath = path.join(contentDirectory, "Blogs", `${slug}.mdx`);
        const { frontmatter, content, readingTime } = parseContent(filePath);

        return {
            slug,
            frontmatter,
            content,
            readingTime,
        };
    } catch (_error) {
        return null;
    }
}

export interface TeamMember extends Frontmatter {
    name: string;
    role: string;
    specialities?: string[];
    avatar?: string;
    bio?: string;
    socials?: {
        github?: string;
        twitter?: string;
        linkedin?: string;
        website?: string;
    };
}

export function getAllTeamMembers(): MDXContent<TeamMember>[] {
    const files = getContentFiles("team");

    return files.map((file) => {
        const slug = file.replace(/\.mdx$/, "");
        const filePath = path.join(contentDirectory, "team", file);
        const { frontmatter, content } = parseContent<TeamMember>(filePath);

        return {
            slug,
            frontmatter,
            content,
        };
    });
}

export function getAuthors(slugs: string[] = []): MDXContent<TeamMember>[] {
    const teamMembers = getAllTeamMembers();
    return teamMembers.filter((member) => slugs.includes(member.slug));
}

export interface Sponsor extends Frontmatter {
    name: string;
    logo: string;
    website?: string;
    tier?: "platinum" | "gold" | "silver" | "bronze";
}

export function getAllSponsors(): MDXContent<Sponsor>[] {
    const files = getContentFiles("sponsors");

    return files.map((file) => {
        const slug = file.replace(/\.mdx$/, "");
        const filePath = path.join(contentDirectory, "sponsors", file);
        const { frontmatter, content } = parseContent<Sponsor>(filePath);

        return {
            slug,
            frontmatter,
            content,
        };
    });
}

export function getHomeContent(): string {
    try {
        const filePath = path.join(contentDirectory, "home", "index.mdx");
        const { content } = parseContent(filePath);
        return content;
    } catch (error) {
        return "";
    }
}

export function getJoinContent(): string {
    try {
        const filePath = path.join(contentDirectory, "join", "index.mdx");
        const { content } = parseContent(filePath);
        return content;
    } catch (error) {
        return "";
    }
}

import GithubSlugger from "github-slugger";

export function generateTableOfContents(content: string): TableOfContentsItem[] {
    const headingRegex = /^(#{2,4})\s+(.+)$/gm;
    const headings: TableOfContentsItem[] = [];
    const slugger = new GithubSlugger();
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length;
        const title = match[2].trim();
        const id = slugger.slug(title);

        headings.push({ id, title, level });
    }

    return headings;
}
