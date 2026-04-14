"use client";

import type * as React from "react";
import { cn } from "../utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MarketingLayoutProps {
  /** Top navbar content (logo, nav links, CTA) */
  navbar: React.ReactNode;
  /** Footer content (links, copyright, socials) */
  footer?: React.ReactNode;
  /** Main page content */
  children: React.ReactNode;
  /** Additional className for the root element */
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * MarketingLayout — fixed navbar + scrollable content + footer.
 *
 * Used by the main marketing/landing app (apps/web/main).
 *
 * ```tsx
 * <MarketingLayout navbar={<SiteNav />} footer={<SiteFooter />}>
 *   {children}
 * </MarketingLayout>
 * ```
 */
export function MarketingLayout({ navbar, footer, children, className }: MarketingLayoutProps) {
  return (
    <div
      className={cn("flex min-h-screen flex-col bg-background text-foreground", className)}
      data-layout="marketing"
    >
      {/* ── Navbar ── */}
      <header
        className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-sm"
        data-marketing-navbar
      >
        <div className="container mx-auto flex h-16 items-center px-4">{navbar}</div>
      </header>

      {/* ── Content ── */}
      <main className="flex-1" data-marketing-content>
        {children}
      </main>

      {/* ── Footer ── */}
      {footer && (
        <footer className="border-t border-border/60 bg-card py-8" data-marketing-footer>
          <div className="container mx-auto px-4">{footer}</div>
        </footer>
      )}
    </div>
  );
}

export default MarketingLayout;
