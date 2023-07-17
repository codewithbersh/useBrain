"use client";

import { signOut, useSession } from "next-auth/react";
import React from "react";

const DashboardPage = () => {
  const { data: session } = useSession();
  return (
    <div>
      <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>
    </div>
  );
};

export default DashboardPage;
