"use client";

import React from "react";
import { NavItem } from "@/types";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";

interface MainNavProps {
  items: NavItem[];
}

const MainNav = ({ items }: MainNavProps) => {
  const segment = useSelectedLayoutSegment();
  return (
    <div className="flex items-center gap-12 font-bold">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo />
        <span>Lorem</span>
      </Link>
      <nav className="flex gap-6">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "text-sm hover:text-foreground/80 font-medium transition-colors",
              item.href.startsWith(`/${segment}`)
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export { MainNav };
