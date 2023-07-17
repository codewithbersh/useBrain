"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { mainConfig } from "@/config/main-config";
import { User } from "@/types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserAccountNavProps {
  user: User | undefined;
}

const UserAccountNav = ({ user }: UserAccountNavProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image} />
          <AvatarFallback>
            <Icons.user />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="-translate-x-4">
        <DropdownMenuLabel>
          <p>{user?.info.firstName}</p>
          <p className="text-muted-foreground font-normal truncate max-w-[200px]">
            {user?.info.email}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {mainConfig.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <Link href={item.href}>{item.title}</Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={() => signOut({ callbackUrl: "/login" })}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { UserAccountNav };
