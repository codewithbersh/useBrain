import React from "react";
import SessionProvider from "@/components/session-provider";
import MyQueryClientProvider from "./queryclient-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      <MyQueryClientProvider>{children}</MyQueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
