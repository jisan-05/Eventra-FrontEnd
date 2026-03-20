
import { Navbar } from "@/components/navbar-5";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Navbar></Navbar>
      {children}
      {/* <Footer2/> */}
    </div>
  );
};

export default CommonLayout;
