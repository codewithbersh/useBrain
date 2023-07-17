"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { mainConfig } from "@/config/main-config";

import { buttonVariants } from "@/components/ui/button";

const SideNav = () => {
  const path = usePathname();
  return (
    <nav className="flex flex-col gap-4 md:min-w-[180px]">
      {mainConfig.map((item) => (
        <Link
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "justify-start gap-3 ",
            path.startsWith(item.href) ? "bg-accent text-accent-foreground" : ""
          )}
          key={item.href}
          href={item.href}
        >
          <item.icon size={16} />
          <span className="hidden md:block">{item.title}</span>
        </Link>
      ))}
    </nav>
  );
};

export { SideNav };
