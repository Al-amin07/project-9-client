"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/provider/UserProvider";
import { CircleUserRound, Menu, X } from "lucide-react";
import { Theme } from "../utils/Theme";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const pathname = usePathname();
  const { user, logOut } = useAuth()!;
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Posts", href: "/posts" },
    { label: "Blog", href: "/blogs" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white   dark:bg-gray-900 shadow-md sticky top-0 z-30">
      <div className="container mx-auto py-4 px-4 md:px-0 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded"
          /> */}
          <span className="text-xl font-bold italic text-black dark:text-white">
            Tasty <span className="text-primary">Foods</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-base font-semibold transition-colors ${pathname === item.href
                  ? "text-primary"
                  : "text-gray-800 dark:text-white hover:text-primary"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Theme />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button>
                  {user?.photo ? (
                    <Image
                      src={user.photo}
                      alt="user"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <CircleUserRound
                      size={40}
                      className="text-gray-500 cursor-pointer hover:scale-105 duration-500 transition-transform"
                    />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                  {user.fullName || "My Account"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/dashboard">
                  <DropdownMenuItem className="cursor-pointer">
                    Dashboard
                    <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>
                <Link href="/profile">
                  <DropdownMenuItem className="cursor-pointer">
                    Profile
                    <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={logOut} className="cursor-pointer">
                  Logout
                  <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex gap-3">
              <Link
                href="/register"
                className="px-4 py-1.5 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold transition duration-300"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="px-4 py-1.5 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold transition duration-300"
              >
                Login
              </Link>
            </div>
          )}
          {/* Mobile Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-black dark:text-white"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block font-semibold text-md ${pathname === item.href
                  ? "text-primary"
                  : "text-gray-800 dark:text-white hover:text-primary"
                }`}
            >
              {item.label}
            </Link>
          ))}
          {!user && (
            <div className="pt-4 space-y-2">
              <Link
                href="/signUp"
                className="block text-md font-bold text-gray-800 dark:text-white"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="block text-md font-bold text-gray-800 dark:text-white"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
