import { ReactNode } from "react";
import { AlertCircle, Info, Lightbulb, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalloutProps {
    children: ReactNode;
    type?: "note" | "tip" | "warning" | "danger";
    title?: string;
}

const calloutConfig = {
    note: {
        icon: Info,
        className: "bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300",
        iconClassName: "text-blue-500",
    },
    tip: {
        icon: Lightbulb,
        className: "bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-300",
        iconClassName: "text-green-500",
    },
    warning: {
        icon: AlertTriangle,
        className: "bg-yellow-500/10 border-yellow-500/30 text-yellow-700 dark:text-yellow-300",
        iconClassName: "text-yellow-500",
    },
    danger: {
        icon: AlertCircle,
        className: "bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300",
        iconClassName: "text-red-500",
    },
};

export function Callout({ children, type = "note", title }: CalloutProps) {
    const config = calloutConfig[type];
    const Icon = config.icon;

    return (
        <div
            className={cn(
                "my-6 rounded-xl border-2 p-4 backdrop-blur-sm",
                config.className
            )}
        >
            <div className="flex gap-3">
                <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", config.iconClassName)} />
                <div className="flex-1">
                    {title && (
                        <div className="font-semibold mb-1 capitalize">
                            {title || type}
                        </div>
                    )}
                    <div className="text-sm leading-relaxed">{children}</div>
                </div>
            </div>
        </div>
    );
}
