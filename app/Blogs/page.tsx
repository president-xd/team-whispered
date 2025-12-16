import { getAllBlogs } from "@/lib/mdx";
import { WriteupList } from "./writeup-list";

export const metadata = {
    title: "Blogs",
    description: "Detailed walkthroughs and security analysis of CTF challenges.",
};

export default function BlogsPage() {
    const Blogs = getAllBlogs();

    return (
        <div className="container py-12 md:py-24 space-y-12">
            <WriteupList Blogs={Blogs} />
        </div>
    );
}

