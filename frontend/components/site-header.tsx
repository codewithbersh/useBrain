import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserInfo } from "@/lib/user";

import { Icons } from "@/components/icons";
import { UserAccountNav } from "@/components/user-account-nav";

const SiteHeader = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  const user = await getUserInfo(session.user.accessToken);

  return (
    <header className="py-4">
      <div className="flex justify-between items-center container">
        <Link href="/" className="items-center justify-between flex">
          <div className="flex gap-2 items-center">
            <Icons.logo size={24} />
            <h1 className="font-bold text-lg">useBrain</h1>
          </div>
        </Link>

        <UserAccountNav user={session.user} initialData={user} />
      </div>
    </header>
  );
};

export { SiteHeader };
