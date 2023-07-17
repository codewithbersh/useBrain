"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const LogoutButton = () => {
  return (
    <Button onClick={() => signOut()} variant="secondary" className="w-full">
      Logout
    </Button>
  );
};

export { LogoutButton };
