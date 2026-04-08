"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";


const DashboardLayout = ({
  admin,
  user,
  manager,
}: {
  admin: React.ReactNode;
  user: React.ReactNode;
  manager: React.ReactNode;
}) => {
    const [session, setSession] = useState<any>(null);
    
      useEffect(() => {
        const getSession = async () => {
          const sessionData = await authClient.getSession();
          setSession(sessionData);
        };
    
        getSession();
      }, []);
    
      const Roles = session?.data?.user?.role;
  return (
    <div>
      {Roles === "ADMIN" && admin}
      {Roles === "USER" && user}
      {Roles === "MANAGER" && (manager || user)}
    </div>
  );
};

export default DashboardLayout;
