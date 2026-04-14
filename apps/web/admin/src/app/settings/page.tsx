import { Button, DashboardLayout } from "@8sync/ui";
import { LayoutDashboard, Settings, Users } from "lucide-react";
import Link from "next/link";

function AdminSidebar() {
  return (
    <div className="flex flex-col h-full p-4 gap-2">
      <div className="flex items-center gap-2 mb-4">
        <LayoutDashboard className="h-5 w-5 text-verse-primary" />
        <span className="font-semibold text-sm">8 Sync Admin</span>
      </div>
      <Link
        href="/"
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-verse-surface text-sm"
      >
        <LayoutDashboard className="h-4 w-4" /> Overview
      </Link>
      <Link
        href="/users"
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-verse-surface text-sm"
      >
        <Users className="h-4 w-4" /> Users
      </Link>
      <Link
        href="/settings"
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-verse-primary/10 text-verse-primary text-sm font-medium"
      >
        <Settings className="h-4 w-4" /> Settings
      </Link>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <DashboardLayout
      sidebar={<AdminSidebar />}
      header={<span className="font-semibold text-sm">Admin Dashboard</span>}
    >
      <div className="flex flex-col gap-6 p-6">
        <div>
          <h1 className="text-3xl font-bold text-verse-text-heading">Settings</h1>
          <p className="text-verse-text-muted mt-1">
            Configure platform preferences and integrations.
          </p>
        </div>
        <div className="flex flex-col gap-4 max-w-lg">
          <div className="rounded-verse-lg border border-verse-border bg-verse-surface p-4 flex flex-col gap-3">
            <h2 className="font-semibold text-verse-text-heading">General</h2>
            <label className="flex flex-col gap-1">
              <span className="text-xs text-verse-text-muted">Platform Name</span>
              <input
                type="text"
                defaultValue="8 Sync Verse"
                className="rounded-verse border border-verse-border bg-verse-bg px-3 py-2 text-sm text-verse-text-heading focus:outline-none focus:ring-2 focus:ring-verse-primary/30"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs text-verse-text-muted">Support Email</span>
              <input
                type="email"
                defaultValue="support@8sync.io"
                className="rounded-verse border border-verse-border bg-verse-bg px-3 py-2 text-sm text-verse-text-heading focus:outline-none focus:ring-2 focus:ring-verse-primary/30"
              />
            </label>
          </div>
          <div className="flex gap-2">
            <Button>Save Changes</Button>
            <Button variant="outline">Reset</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
