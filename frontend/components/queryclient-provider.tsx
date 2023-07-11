"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

interface MyQueryClientProviderProps {
  children: React.ReactNode;
}

const MyQueryClientProvider = ({ children }: MyQueryClientProviderProps) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default MyQueryClientProvider;
