import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { Icons } from "@/components/icons";
import { UserAccountNav } from "@/components/user-account-nav";

const SiteHeader = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="py-4">
      <div className="flex justify-between items-center container">
        <Link href="/" className="items-center justify-between flex">
          <div className="flex gap-2 items-center">
            <Icons.logo size={24} />
            <h1 className="font-bold text-lg">useBrain</h1>
          </div>
        </Link>

        <UserAccountNav user={session?.user} />
      </div>
    </header>
  );
};

export { SiteHeader };
