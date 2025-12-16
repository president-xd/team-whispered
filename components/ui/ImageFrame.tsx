import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageFrameProps {
    src: string;
    alt: string;
    // Helper to support both old and new usage, or just new 'variant'
    aspectRatio?: "square" | "video" | "contain";
    variant?: "square" | "video" | "circle";
    className?: string;
    priority?: boolean;
}

export function ImageFrame({
    src,
    alt,
    aspectRatio,
    variant = "square",
    className,
    priority = false,
}: ImageFrameProps) {

    // Map variant/aspectRatio to styles
    // Priority: variant > aspectRatio
    const finalVariant = variant || aspectRatio || "square";

    const variantStyles = {
        square: "aspect-square rounded-none",
        video: "aspect-video rounded-none",
        circle: "aspect-square rounded-full",
        contain: "w-full h-full",
    };

    // Handle legacy 'contain' aspect ratio if passed via aspectRatio prop
    const isContain = aspectRatio === "contain";
    const objectFit = isContain ? "object-contain" : "object-cover";

    return (
        <div
            className={cn(
                "relative overflow-hidden bg-muted",
                variantStyles[finalVariant as keyof typeof variantStyles] || "aspect-square rounded-none",
                className
            )}
        >
            <Image
                src={src}
                alt={alt}
                fill
                className={cn(objectFit, "transition-transform duration-300")}
                priority={priority}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </div>
    );
}
