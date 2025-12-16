import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const geistMono = GeistMono;

export const metadata: Metadata = {
  title: {
    default: "wh1sp3r3d | Elite CTF Team",
    template: "%s | wh1sp3r3d",
  },
  description: "Elite cybersecurity team specializing in CTF competitions, and security research.",
  keywords: ["CTF", "cybersecurity", "hacking", "security research", "penetration testing", "crypto", "web", "pwn", "reverse", "mobile", "forensics", "stego", "binary"],
  authors: [{ name: "wh1sp3r3d" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wh1sp3r3d.vercel.app/",
    siteName: "wh1sp3r3d",
    title: "wh1sp3r3d | Elite CTF Team",
    description: "Elite cybersecurity team specializing in CTF competitions, and security research.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "wh1sp3r3d",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.variable} font-mono antialiased text-sm`}>
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col bg-background">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <footer className="py-6 md:px-8 md:py-0 border-t border-border">
              <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground">
                  © 2025 wh1sp3r3d. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
