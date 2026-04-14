import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";

const titles: Record<string, string> = {
  learn: "Learn IT — 8 Sync Verse",
  agent: "AI Agent — 8 Sync Verse",
  admin: "Admin — 8 Sync Verse",
};

export const metadata: Metadata = {
  title: titles.learn || "8 Sync Verse",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="vi"
      className={`dark ${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-verse-bg font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
