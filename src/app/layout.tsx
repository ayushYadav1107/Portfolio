import type { Metadata, Viewport } from "next";
// Self-hosted fonts (bundled at build time — no runtime call to Google).
import "@fontsource-variable/bricolage-grotesque/standard.css";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Boot } from "@/components/Boot";
import { Cursor } from "@/components/Cursor";
import { profile } from "@/data/profile";
import "./globals.css";


const description =
  "Ayush Yadav — full-stack software engineer building typed React apps, secured APIs and multi-agent AI systems on LangGraph & MCP. Open to SDE roles.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: `${profile.name} — Full-Stack Engineer`, template: `%s — ${profile.name}` },
  description,
  keywords: ["Ayush Yadav", "full-stack engineer", "software engineer", "Next.js", "React", "LangGraph", "MCP", "portfolio"],
  authors: [{ name: profile.name, url: profile.siteUrl }],
  openGraph: {
    type: "website",
    title: `${profile.name} — Full-Stack & AI Engineer`,
    description,
    url: profile.siteUrl,
    siteName: profile.name,
  },
  twitter: { card: "summary_large_image", title: `${profile.name} — Full-Stack & AI Engineer`, description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#09090a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    url: profile.siteUrl,
    address: { "@type": "PostalAddress", addressLocality: "Bhopal", addressCountry: "IN" },
    alumniOf: "VIT Bhopal University",
    sameAs: profile.socials.map((s) => s.href),
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-ink text-bone antialiased">
        <a
          href="#main"
          className="tag sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-bone focus:px-4 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>
        <Boot />
        <SmoothScroll>{children}</SmoothScroll>
        <Cursor />
        <div className="grain" aria-hidden="true" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
