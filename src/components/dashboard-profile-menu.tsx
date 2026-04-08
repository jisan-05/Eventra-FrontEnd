"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { authClient } from "@/lib/auth-client";
import SafeUserImage from "@/components/SafeUserImage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function DashboardProfileMenu() {
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const data = await authClient.getSession();
      setSession(data);
    };
    load();
  }, []);

  const user = session?.data?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out");
    router.push("/");
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-9 w-9 overflow-hidden rounded-full border border-border bg-muted">
          <SafeUserImage
            src={user?.image}
            alt={user?.name || "Profile"}
            width={36}
            height={36}
            className="h-full w-full object-cover"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>
          <p className="font-medium">{user?.name || "User"}</p>
          <p className="text-xs text-muted-foreground">{user?.email || ""}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <User className="mr-2 h-4 w-4" /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings">
            <Settings className="mr-2 h-4 w-4" /> Dashboard Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} variant="destructive">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
