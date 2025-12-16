"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, FileText, Heart, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
    name: string;
    href: string;
    icon: any;
}

const navItems: NavItem[] = [
    { name: "Home", href: "/", icon: Home },
    { name: "Team", href: "/team", icon: Users },
    { name: "Blogs", href: "/Blogs", icon: FileText },
    { name: "Sponsors", href: "/sponsors", icon: Heart },
    { name: "Join", href: "/join", icon: UserPlus },
];

export function DockNavbar() {
    const [isVisible, setIsVisible] = useState(true);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const pathname = usePathname();
    const dockRef = useRef<HTMLDivElement>(null);
    const mouseYRef = useRef(0);
    const rafIdRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        let lastY = 0;
        const HIDE_THRESHOLD = 120; // pixels from top

        const handleMouseMove = (e: MouseEvent) => {
            mouseYRef.current = e.clientY;

            // Throttle with requestAnimationFrame
            if (!rafIdRef.current) {
                rafIdRef.current = requestAnimationFrame(() => {
                    const currentY = mouseYRef.current;

                    if (currentY > HIDE_THRESHOLD && lastY <= HIDE_THRESHOLD) {
                        setIsVisible(false);
                    } else if (currentY <= HIDE_THRESHOLD && lastY > HIDE_THRESHOLD) {
                        setIsVisible(true);
                    }

                    lastY = currentY;
                    rafIdRef.current = undefined;
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, []);

    const getScale = (index: number) => {
        if (hoveredIndex === null) return 1;

        const distance = Math.abs(index - hoveredIndex);

        if (distance === 0) return 1.5;
        if (distance === 1) return 1.25;
        if (distance === 2) return 1.1;

        return 1;
    };

    return (
        <>
            {/* Peek indicator when hidden */}
            {!isVisible && (
                <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 rounded-b-full" />
            )}

            <nav
                ref={dockRef}
                className={cn(
                    "fixed top-6 left-1/2 -translate-x-1/2 z-50",
                    "transition-all duration-300 ease-out",
                    isVisible ? "translate-y-0 opacity-100" : "-translate-y-32 opacity-0"
                )}
            >
                <div className="glass-strong rounded-2xl px-2 sm:px-4 py-2 sm:py-3 shadow-2xl">
                    <ul className="flex items-end gap-1 sm:gap-2">
                        {navItems.map((item, index) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            const scale = getScale(index);

                            return (
                                <li
                                    key={item.href}
                                    className="relative"
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    style={{
                                        transform: `scale(${scale})`,
                                        transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                                    }}
                                >
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "relative flex flex-col items-center gap-1 px-2 py-1.5 sm:px-4 sm:py-2 rounded-xl",
                                            "transition-all duration-200",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                                            "group"
                                        )}
                                    >
                                        {/* Hover background */}
                                        <span
                                            className={cn(
                                                "absolute inset-0 rounded-xl transition-all duration-200",
                                                "bg-gradient-to-br from-primary/20 to-primary/10",
                                                hoveredIndex === index || isActive
                                                    ? "opacity-100 scale-100"
                                                    : "opacity-0 scale-95"
                                            )}
                                        />

                                        {/* Icon */}
                                        <Icon
                                            className={cn(
                                                "w-5 h-5 sm:w-6 sm:h-6 relative z-10 transition-colors duration-200",
                                                isActive
                                                    ? "text-primary"
                                                    : "text-foreground group-hover:text-primary"
                                            )}
                                        />

                                        {/* Label */}
                                        <span
                                            className={cn(
                                                "text-[10px] sm:text-xs font-medium relative z-10 transition-all duration-200",
                                                "hidden sm:block", // Hide label on mobile
                                                isActive
                                                    ? "text-primary opacity-100"
                                                    : "text-muted-foreground opacity-0 group-hover:opacity-100"
                                            )}
                                        >
                                            {item.name}
                                        </span>

                                        {/* Active indicator */}
                                        {isActive && (
                                            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary shadow-glow" />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>
        </>
    );
}
