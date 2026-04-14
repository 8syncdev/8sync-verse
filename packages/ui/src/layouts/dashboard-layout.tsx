"use client";

import type * as React from "react";
import { cn } from "../utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DashboardLayoutProps {
  /** Sidebar content (nav links, logo, etc.) */
  sidebar: React.ReactNode;
  /** Top header content (breadcrumb, user menu, etc.) */
  header?: React.ReactNode;
  /** Main page content */
  children: React.ReactNode;
  /** Additional className for the root element */
  className?: string;
  /** Whether the sidebar is collapsed to icon-only mode */
  sidebarCollapsed?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * DashboardLayout — sidebar + header + main content area.
 *
 * Used by admin, agent, and learn apps that need a persistent side-nav.
 *
 * ```tsx
 * <DashboardLayout sidebar={<AppSidebar />} header={<AppHeader />}>
 *   {children}
 * </DashboardLayout>
 * ```
 */
export function DashboardLayout({
  sidebar,
  header,
  children,
  className,
  sidebarCollapsed = false,
}: DashboardLayoutProps) {
  return (
    <div
      className={cn("flex min-h-screen bg-background text-foreground", className)}
      data-layout="dashboard"
    >
      {/* ── Sidebar ── */}
      <aside
        className={cn(
          "flex flex-col shrink-0 border-r border-border bg-card",
          "transition-[width] duration-200 ease-in-out",
          sidebarCollapsed ? "w-16" : "w-64",
        )}
        data-sidebar
        aria-label="Sidebar navigation"
      >
        {sidebar}
      </aside>

      {/* ── Main column ── */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Header */}
        {header && (
          <header
            className="flex items-center h-14 shrink-0 border-b border-border bg-card/80 backdrop-blur-sm px-4"
            data-dashboard-header
          >
            {header}
          </header>
        )}

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6" data-dashboard-content>
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
