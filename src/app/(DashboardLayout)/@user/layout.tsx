"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Mail,
  Star,
  Settings,
  Menu,
  X,
  Search,
} from "lucide-react";

// Sidebar nav items
const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Events", href: "/dashboard/myevents", icon: CalendarDays },
  { name: "Joined Events", href: "/dashboard/view-all-orders", icon: Users },
  { name: "Invitations", href: "/dashboard/invitations", icon: Mail },
  { name: "Reviews", href: "/dashboard/add-category", icon: Star },
  { name: "Settings", href: "/dashboard/manage-category", icon: Settings },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-white/90 backdrop-blur-xl border-r shadow-lg transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="p-6 border-b flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight">
            <Link href="/">Eventra</Link>
          </h1>
          <button onClick={() => setOpen(false)} className="lg:hidden">
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="p-4 space-y-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${
                    isActive
                      ? "bg-black text-white shadow"
                      : "text-gray-600 hover:bg-gray-200/60 hover:text-black"
                  }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 w-full p-4 border-t">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300" />
            <div>
              <p className="text-sm font-semibold">Jisan</p>
              <p className="text-xs text-gray-500">Developer</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full lg:ml-64">
        {/* Topbar */}
        <header className="h-16 bg-white/90 backdrop-blur-xl border-b flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          {/* Left */}
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setOpen(true)}>
              <Menu size={22} />
            </button>
            <h2 className="text-lg font-semibold tracking-tight">Dashboard</h2>
          </div>

          {/* Center (Search) */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-1.5 w-72">
            <Search size={16} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none px-2 text-sm w-full"
            />
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-gray-300 cursor-pointer" />
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;