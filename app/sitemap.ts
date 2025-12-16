import { MetadataRoute } from "next";
import { getAllBlogs } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://wh1sp3r3d.com";

    const Blogs = getAllBlogs();
    const writeupUrls = Blogs.map((writeup) => ({
        url: `${baseUrl}/Blogs/${writeup.slug}`,
        lastModified: writeup.frontmatter.date
            ? new Date(writeup.frontmatter.date)
            : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    const routes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/team`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/Blogs`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/sponsors`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.6,
        },
        {
            url: `${baseUrl}/join`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        },
    ];

    return [...routes, ...writeupUrls];
}
