import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link";
    size?: "default" | "sm" | "lg" | "icon";
}

export function Button({
    children,
    variant = "default",
    size = "default",
    className,
    ...props
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 uppercase tracking-widest";

    // Minimalist ctf.gg style: sharp corners, flat colors
    const variants = {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-none",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-none",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-none",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-none",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-none",
        link: "text-primary underline-offset-4 hover:underline rounded-none",
    };

    const sizes = {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        icon: "h-9 w-9",
    };

    return (
        <button
            className={cn(
                baseStyles,
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
