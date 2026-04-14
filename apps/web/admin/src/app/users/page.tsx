import { DashboardLayout } from "@8sync/ui";
import { LayoutDashboard, Users, Settings } from "lucide-react";
import Link from "next/link";

function AdminSidebar() {
  return (
    <div className="flex flex-col h-full p-4 gap-2">
      <div className="flex items-center gap-2 mb-4">
        <LayoutDashboard className="h-5 w-5 text-verse-primary" />
        <span className="font-semibold text-sm">8 Sync Admin</span>
      </div>
      <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-verse-surface text-sm">
        <LayoutDashboard className="h-4 w-4" /> Overview
      </Link>
      <Link href="/users" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-verse-primary/10 text-verse-primary text-sm font-medium">
        <Users className="h-4 w-4" /> Users
      </Link>
      <Link href="/settings" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-verse-surface text-sm">
        <Settings className="h-4 w-4" /> Settings
      </Link>
    </div>
  );
}

const MOCK_USERS = [
  { id: 1, name: "Alice Nguyen", email: "alice@8sync.io", role: "Admin", status: "Active" },
  { id: 2, name: "Bob Tran", email: "bob@8sync.io", role: "Editor", status: "Active" },
  { id: 3, name: "Carol Le", email: "carol@8sync.io", role: "Viewer", status: "Inactive" },
];

export default function UsersPage() {
  return (
    <DashboardLayout sidebar={<AdminSidebar />} header={<span className="font-semibold text-sm">Admin Dashboard</span>}>
      <div className="flex flex-col gap-6 p-6">
        <div>
          <h1 className="text-3xl font-bold text-verse-text-heading">Users</h1>
          <p className="text-verse-text-muted mt-1">Manage platform users and roles.</p>
        </div>
        <div className="rounded-verse-lg border border-verse-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-verse-surface">
              <tr>
                {["Name", "Email", "Role", "Status"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium text-verse-text-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_USERS.map((user) => (
                <tr key={user.id} className="border-t border-verse-border hover:bg-verse-surface/50">
                  <td className="px-4 py-3 font-medium text-verse-text-heading">{user.name}</td>
                  <td className="px-4 py-3 text-verse-text-muted">{user.email}</td>
                  <td className="px-4 py-3">{user.role}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${user.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
