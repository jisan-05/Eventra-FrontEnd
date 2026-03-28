import { Navbar } from "@/components/navbar-5";
import { SiteFooter } from "@/components/site-footer";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
};

export default CommonLayout;
