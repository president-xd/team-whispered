import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "outline" | "ghost";
}

export function Card({
    children,
    className,
    variant = "default",
    ...props
}: CardProps) {
    return (
        <div
            className={cn(
                "rounded-none border bg-card text-card-foreground shadow-sm transition-colors",
                variant === "default" && "border-border",
                variant === "outline" && "border-border bg-transparent shadow-none",
                variant === "ghost" && "border-none shadow-none bg-transparent",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
