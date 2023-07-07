import React from "react";
import { HomeHeader } from "@/components/home-header";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div>
      <HomeHeader />
      {children}
    </div>
  );
};

export default HomeLayout;
