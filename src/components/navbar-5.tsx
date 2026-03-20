"use client";

import { MenuIcon, LogOut, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
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

// 🔹 Fake auth state (replace with real auth later)
const isLoggedIn = true;

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">

          {/* 🔹 Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.avif" // replace with your logo
              alt="Planora"
              width={32}
              height={32}
              priority
            />
            <span className="text-lg font-bold">Planora</span>
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
                      <Link href="/login" className={navigationMenuTriggerStyle()}>
                        Login
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/signup" className={navigationMenuTriggerStyle()}>
                        Signup
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </>
              ) : (
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/dashboard" className={navigationMenuTriggerStyle()}>
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
              <>
                <Link href="/dashboard/create-event">
                  <Button>Create Event</Button>
                </Link>

                {/* 🔹 Profile Avatar Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
                      👤
                    </div>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/profile">
                        <User className="mr-2 h-4 w-4" /> My Profile
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/my-events">
                        <User className="mr-2 h-4 w-4" /> My Events
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      <button className="flex items-center w-full">
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>

          {/* 🔹 Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-5 w-5" />
              </Button>
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
                    <Link href="/dashboard/create-event">Create Event</Link>
                    <Link href="/dashboard/profile">Profile</Link>
                    <Link href="/dashboard/my-events">My Events</Link>
                    <button className="text-left">Logout</button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
};