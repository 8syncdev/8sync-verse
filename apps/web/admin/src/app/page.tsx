import { DashboardLayout } from "@8sync/ui";
import { Button } from "@8sync/ui";
import { LayoutDashboard, Users, Settings, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

function AdminSidebar() {
  return (
    <div className="flex flex-col h-full p-4 gap-2">
      <div className="flex items-center gap-2 mb-4">
        <LayoutDashboard className="h-5 w-5 text-verse-primary" />
        <span className="font-semibold text-sm">8 Sync Admin</span>
      </div>
      <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-verse-primary/10 text-verse-primary text-sm font-medium">
        <LayoutDashboard className="h-4 w-4" /> Overview
      </Link>
      <Link href="/users" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-verse-surface text-sm">
        <Users className="h-4 w-4" /> Users
      </Link>
      <Link href="/settings" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-verse-surface text-sm">
        <Settings className="h-4 w-4" /> Settings
      </Link>
    </div>
  );
}

export default function OverviewPage() {
  return (
    <DashboardLayout sidebar={<AdminSidebar />} header={<span className="font-semibold text-sm">Admin Dashboard</span>}>
      <div className="flex flex-col gap-6 p-6">
        <div>
          <h1 className="text-3xl font-bold text-verse-text-heading">Overview</h1>
          <p className="text-verse-text-muted mt-1">Welcome to the 8 Sync admin panel.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Users", value: "1,024", icon: Users },
            { label: "Active Sessions", value: "128", icon: TrendingUp },
            { label: "Platform Health", value: "99.9%", icon: LayoutDashboard },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-verse-lg border border-verse-border bg-verse-surface p-4 flex items-center gap-4">
              <div className="p-2 rounded-verse bg-verse-primary/10">
                <Icon className="h-5 w-5 text-verse-primary" />
              </div>
              <div>
                <p className="text-xs text-verse-text-muted">{label}</p>
                <p className="text-xl font-bold text-verse-text-heading">{value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/users">Manage Users <ArrowRight className="h-4 w-4" /></Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/settings">Settings</Link>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
