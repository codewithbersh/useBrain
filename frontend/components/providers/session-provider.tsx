"use client";

import React from "react";
import { SessionProvider as SessionProviderNextAuth } from "next-auth/react";

interface SessionProviderProps {
  children: React.ReactNode;
}

const SessionProvider = ({ children }: SessionProviderProps) => {
  return <SessionProviderNextAuth>{children}</SessionProviderNextAuth>;
};

export default SessionProvider;
