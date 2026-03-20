import Link from "next/link";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">
          <Link href="/">FoodHub</Link>
        </h1>
        <nav className="flex flex-col gap-4">
          <a
            href="/dashboard"
            className="text-gray-700 font-medium hover:text-blue-500"
          >
            Dashboard
          </a>
          <a
            href="/dashboard/manage-user"
            className="text-gray-700 font-medium hover:text-blue-500"
          >
            Manage users{" "}
          </a>
          <a
            href="/dashboard/View-all-orders
"
            className="text-gray-700 font-medium hover:text-blue-500"
          >
            View all orders{" "}
          </a>
          <a
            href="/dashboard/add-category"
            className="text-gray-700 font-medium hover:text-blue-500"
          >
            add Category
          </a>
          <a
            href="/dashboard/manage-category"
            className="text-gray-700 font-medium hover:text-blue-500"
          >
            Manage Category
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default layout;
