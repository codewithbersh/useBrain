import React from "react";
import { HomeHeader } from "@/components/home-header";
import { HomeFooter } from "@/components/home-footer";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div>
      <HomeHeader />
      {children}
      <HomeFooter />
    </div>
  );
};

export default HomeLayout;
