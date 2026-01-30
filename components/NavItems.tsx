'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Companions', href: '/companions' },
  { label: 'My Journey', href: '/my-journey' },
];

const NavItems = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6">
      {navItems.map(({ label, href }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={label}
            href={href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive
                ? "text-primary"
                : "text-muted-foreground"
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
