import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { homeConfig } from "@/config/home-config";

import { MainNav } from "@/components/main-nav";
import { buttonVariants } from "@/components/ui/button";

const HomeHeader = async () => {
  const user = await getCurrentUser();
  return (
    <div>
      <header className="py-6 container flex items-center justify-between">
        <MainNav items={homeConfig} />
        {user ? (
          <Link className={buttonVariants()} href="/dashboard">
            Dashboard
          </Link>
        ) : (
          <Link className={buttonVariants()} href="/api/auth/signin">
            Get Started
          </Link>
        )}
      </header>
    </div>
  );
};

export { HomeHeader };
