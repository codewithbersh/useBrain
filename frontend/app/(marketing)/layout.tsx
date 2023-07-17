import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <section>
      <header>
        <div className="flex items-center justify-between container py-8">
          <div className="flex items-center gap-2">
            <Icons.logo size={48} />
            <h1 className="font-bold text-2xl">useBrain</h1>
          </div>
          <nav>
            {session ? (
              <Link
                href="/dashboard"
                className={cn(buttonVariants({ variant: "secondary" }))}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className={cn(buttonVariants({ variant: "secondary" }))}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>
      <div>{children}</div>
    </section>
  );
}
