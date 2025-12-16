# wh1sp3r3d Website

A modern, macOS-inspired website for a cybersecurity/CTF team built with Next.js, TypeScript, Tailwind CSS, and MDX.

## Features

- 🎨 **macOS-inspired Design**: Glassmorphism effects, smooth animations, and premium UI
- 🧭 **Dock Navigation**: Auto-hiding navbar with magnification effects like macOS Dock
- 🌓 **Theme Switching**: Light/Dark/System modes with localStorage persistence
- 📝 **MDX Content**: All content (writeups, team, sponsors) managed via MDX files
- 🔍 **SEO Optimized**: Metadata, OpenGraph, sitemap, robots.txt
- ♿ **Accessible**: Keyboard navigation, focus states, reduced motion support
- 🚀 **Performance**: Fast loading, lazy images, code-splitting
- 🔒 **Security**: Safe MDX rendering, security headers, CSP-ready

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
cd team-website
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
team-website/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Home page
│   ├── team/              # Team page
│   ├── writeups/          # Writeups listing and detail pages
│   ├── sponsors/          # Sponsors page
│   ├── join/              # Join/application page
│   ├── sitemap.ts         # Dynamic sitemap
│   └── robots.ts          # Robots.txt
├── components/
│   ├── layout/            # Layout components (Dock, Theme)
│   ├── ui/                # UI components (Button, Card, etc.)
│   └── mdx/               # MDX components (CodeBlock, Callout)
├── content/               # MDX content files
│   ├── writeups/          # Blog posts/writeups
│   ├── team/              # Team member profiles
│   ├── sponsors/          # Sponsor information
│   └── join/              # Join page content
├── lib/                   # Utilities and helpers
│   ├── mdx.ts            # MDX content loaders
│   └── utils.ts          # General utilities
└── public/               # Static assets
    └── images/           # Images for team, writeups, sponsors
```

## Adding Content

### Writeups

Create a new `.mdx` file in `content/writeups/`:

```mdx
---
title: "Your Writeup Title"
date: "2024-12-15"
tags: ["web", "crypto"]
summary: "Brief description"
cover: "/images/writeups/cover.jpg"
---

Your content here with full MDX support!
```

### Team Members

Create a new `.mdx` file in `content/team/`:

```mdx
---
name: "Your Name"
role: "Your Role"
avatar: "/images/team/avatar.jpg"
bio: "Short bio"
socials:
  github: "username"
  twitter: "username"
---
```

### Sponsors

Create a new `.mdx` file in `content/sponsors/`:

```mdx
---
name: "Sponsor Name"
logo: "/images/sponsors/logo.svg"
website: "https://sponsor.com"
tier: "platinum"
---
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Vercel will auto-detect Next.js and deploy

### Manual Deployment

```bash
npm run build
```

Deploy the `.next` folder and `public` directory to your hosting provider.

## Customization

### Colors

Edit `tailwind.config.ts` and `app/globals.css` to customize the color scheme.

### Dock Behavior

Adjust the `HIDE_THRESHOLD` in `components/layout/DockNavbar.tsx` (default: 120px).

### Theme

Modify CSS variables in `app/globals.css` under `:root` and `.dark` selectors.

## Technologies

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX with next-mdx-remote
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## License

MIT

## Support

For questions or issues, contact: team@wh1sp3r3d.com
