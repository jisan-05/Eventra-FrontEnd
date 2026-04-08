"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BriefcaseBusiness, ChartColumn, Menu, Settings, UserCircle2, Users, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import DashboardProfileMenu from "@/components/dashboard-profile-menu";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: BriefcaseBusiness },
  { name: "Manager Profile", href: "/dashboard/manager-profile", icon: UserCircle2 },
  { name: "Team", href: "/dashboard/manage-users", icon: Users },
  { name: "Reports", href: "/dashboard/reports", icon: ChartColumn },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {open && (
        <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setOpen(false)} />
      )}
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-card border-r border-border transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <h1 className="text-xl font-bold">
            <Link href="/">Eventra</Link>
          </h1>
          <button onClick={() => setOpen(false)} className="lg:hidden">
            <X size={20} />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col w-full lg:ml-64">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setOpen(true)}>
              <Menu size={22} />
            </button>
            <h2 className="text-lg font-semibold">Manager Dashboard</h2>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <DashboardProfileMenu />
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
