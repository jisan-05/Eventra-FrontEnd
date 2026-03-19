
// import { Navbar1 } from "@/components/shared/navbar1";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-20">
      {/* <Navbar1/> */}
      {children}
      {/* <Footer2/> */}
    </div>
  );
};

export default CommonLayout;
