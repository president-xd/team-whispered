import { getAllWriteups } from "@/lib/mdx";
import { WriteupList } from "./writeup-list";

export const metadata = {
    title: "Writeups",
    description: "Detailed walkthroughs and security analysis of CTF challenges.",
};

export default function WriteupsPage() {
    const writeups = getAllWriteups();

    return (
        <div className="container py-12 md:py-24 space-y-12">
            <WriteupList writeups={writeups} />
        </div>
    );
}

