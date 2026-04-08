"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: "🏠" },
  { name: "Manage Users", href: "/dashboard/manage-users", icon: "👥" },
  { name: "Manage Events", href: "/dashboard/manage-events", icon: "📅" },
  { name: "Reports", href: "/dashboard/reports", icon: "📊" },
  { name: "Settings", href: "/dashboard/settings", icon: "⚙️" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-card/95 backdrop-blur-xl border-r border-border shadow-lg transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="p-6 border-b flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">
            <Link href="/">Eventra</Link>
          </h1>
          <button onClick={() => setOpen(false)} className="lg:hidden">
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
              >
                <span>{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 w-full p-4 border-t">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted" />
            <div>
              <p className="text-sm font-semibold">Jisan</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full lg:ml-64">
        {/* Topbar */}
        <header className="h-16 bg-card/95 backdrop-blur-xl border-b border-border flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          {/* Left */}
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setOpen(true)}>
              <Menu size={22} />
            </button>
            <h2 className="text-lg font-semibold tracking-tight">Dashboard</h2>
          </div>

          {/* Right placeholder (profile) */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="w-9 h-9 rounded-full bg-muted cursor-pointer" />
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;