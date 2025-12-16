"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Team", href: "/team" },
    { name: "Writeups", href: "/writeups" },
    { name: "Sponsors", href: "/sponsors" },
    { name: "Join", href: "/join" },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center space-x-2 font-bold">
                        <span>wh1sp3r3d</span>
                    </Link>
                </div>

                <div className="flex items-center gap-6">
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "transition-colors hover:text-foreground/80",
                                    pathname === item.href ? "text-foreground" : "text-foreground/60"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
