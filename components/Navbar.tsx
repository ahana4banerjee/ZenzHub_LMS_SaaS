'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import NavItems from "@/components/NavItems";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 relative overflow-hidden">
      {/* Ombre background */}
      {/* Soft cyan / off-white navbar background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,211,238,0.35)_0%,_rgba(255,255,255,0.85)_60%,_rgba(255,255,255,0.95)_100%)]" />
      <div className="absolute inset-0 backdrop-blur-md bg-white/70" />

      <nav className="navbar relative z-10 text-black flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <Image
              src="/Zenzubassets/genz.jpg"
              alt="Zenzhub logo"
              width={40}
              height={30}
              priority
            />
            <span className="text-lg font-semibold tracking-tight">
              Zenzhub
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavItems />

          <SignedOut>
            <SignInButton>
              <button className="btn-signin text-black hover:text-cyan-500">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile Hamburger Icon */}
        <button
          className="md:hidden p-2 text-black hover:text-cyan-500 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Sidebar Content */}
        <div className="relative h-full w-[280px] bg-white shadow-2xl flex flex-col p-6">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <div className="flex items-center gap-3">
                <Image
                  src="/Zenzubassets/genz.jpg"
                  alt="Zenzhub logo"
                  width={32}
                  height={24}
                />
                <span className="text-lg font-semibold tracking-tight">
                  Zenzhub
                </span>
              </div>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-black hover:text-cyan-500"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            <NavItems className="flex-col items-start gap-4" />

            <div className="pt-6 border-t border-gray-100">
              <SignedOut>
                <SignInButton>
                  <button className="w-full btn-signin text-black hover:text-cyan-500 text-left py-2 font-medium">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center gap-4 py-2">
                  <UserButton />
                  <span className="text-sm font-medium">Profile Settings</span>
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
