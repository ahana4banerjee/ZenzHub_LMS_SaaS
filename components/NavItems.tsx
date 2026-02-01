'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Companions', href: '/companions' },
  { label: 'My Journey', href: '/my-journey' },
];

const NavItems = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center gap-6", className)}>
      {navItems.map(({ label, href }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={label}
            href={href}
            className={cn(
              "text-sm font-medium transition-colors",
              isActive
                ? "text-cyan-600"
                : "text-black/70 hover:text-cyan-500"
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavItems;
