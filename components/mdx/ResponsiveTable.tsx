import { ReactNode } from "react";

interface ResponsiveTableProps {
    children: ReactNode;
}

export function ResponsiveTable({ children }: ResponsiveTableProps) {
    return (
        <div className="my-6 overflow-x-auto rounded-xl glass">
            <table className="w-full">{children}</table>
        </div>
    );
}
