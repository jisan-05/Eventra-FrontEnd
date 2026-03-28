/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { LogOut, MenuIcon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SafeUserImage from "@/components/SafeUserImage";

export const Navbar = () => {
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    setSession(null);
    router.push("/");
    router.refresh();
  };

  useEffect(() => {
    const getSession = async () => {
      const sessionData = await authClient.getSession();
      setSession(sessionData);
    };

    getSession();
  }, []);

  const isLoggedIn = session?.data?.user;
  const user = session?.data?.user;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* 🔹 Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.avif"
              alt="Eventra"
              width={32}
              height={32}
              priority
            />
            <span className="text-lg font-bold">Eventra</span>
          </Link>

          {/* 🔹 Desktop Menu */}
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/" className={navigationMenuTriggerStyle()}>
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/events" className={navigationMenuTriggerStyle()}>
                    Events
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {!isLoggedIn ? (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/login"
                        className={navigationMenuTriggerStyle()}
                      >
                        Login
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/signup"
                        className={navigationMenuTriggerStyle()}
                      >
                        Signup
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </>
              ) : (
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/dashboard"
                      className={navigationMenuTriggerStyle()}
                    >
                      Dashboard
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {/* 🔹 Right Section Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <Link href="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button>Signup</Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {/* ✅ FIX: use button instead of div */}
                  <button className="w-9 h-9 rounded-full overflow-hidden border">
                    <SafeUserImage
                      src={user?.image}
                      alt="Profile"
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48 z-50">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" /> My Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <User className="mr-2 h-4 w-4" /> Dashboard
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <button type="button" className="flex items-center w-full" onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* 🔹 Mobile Section */}
          <div className="lg:hidden flex items-center gap-2">
            {/* ✅ Logged in → show dropdown */}
            {isLoggedIn && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-9 h-9 rounded-full overflow-hidden border">
                    <SafeUserImage
                      src={user?.image}
                      alt="Profile"
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48 z-50">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <button type="button" className="w-full text-left" onClick={handleSignOut}>
                      Logout
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* ✅ Mobile Menu (Sheet) */}
            <Sheet>
              <SheetTrigger asChild>
                <button>
                  <MenuIcon className="h-5 w-5" />
                </button>
              </SheetTrigger>

              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-4 mt-6">
                  <Link href="/">Home</Link>
                  <Link href="/events">Events</Link>

                  {!isLoggedIn ? (
                    <>
                      <Link href="/login">Login</Link>
                      <Link href="/signup">Signup</Link>
                    </>
                  ) : (
                    <>
                      <Link href="/dashboard">Dashboard</Link>
                      <Link href="/profile">Profile</Link>
                      <button type="button" className="text-left" onClick={handleSignOut}>
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};
