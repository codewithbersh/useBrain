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
    <section className="min-h-screen flex flex-col justify-between">
      <header>
        <div className="flex items-center justify-between container py-8">
          <Link href="/" className="flex items-center gap-2">
            <Icons.logo size={48} />
            <h1 className="font-bold text-2xl">useBrain</h1>
          </Link>
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
        <div>{children}</div>
      </header>
      <footer className="w-full container py-4">
        <p className="min-[431px]:text-center">
          <span>
            Backend service deployed on{" "}
            <Link
              href="https://render.com/"
              className="underline"
              target="_blank"
            >
              Render
            </Link>
            .{" "}
          </span>
          <span>
            Frontend service deployed on{" "}
            <Link
              href="https://vercel.com/"
              className="underline"
              target="_blank"
            >
              Vercel
            </Link>
            .{" "}
          </span>
          <span>
            Visit code on{" "}
            <Link
              href="https://github.com/codewithbersh/online-learning-platform"
              className="underline"
              target="_blank"
            >
              Github
            </Link>
            .{" "}
          </span>
          <span>
            Illustrations by{" "}
            <Link
              href="https://popsy.co/illustrations"
              className="underline"
              target="_blank"
            >
              Popsy
            </Link>
            .
          </span>
        </p>
      </footer>
    </section>
  );
}
