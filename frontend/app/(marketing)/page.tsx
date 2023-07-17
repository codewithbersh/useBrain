import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Balancer } from "react-wrap-balancer";

import { buttonVariants } from "@/components/ui/button";

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="container">
      <div className="py-4 sm:py-12 flex flex-col sm:items-center gap-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold sm:text-center leading-none lg:leading-[1.1]">
            <Balancer>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at
              laoreet ante.
            </Balancer>
          </h1>
          <p className="text-muted-foreground sm:text-center">
            Sed ac imperdiet libero, eget laoreet risus. Fusce a ante mollis,
            rhoncus.
          </p>
        </div>

        {session ? (
          <Link href="/dashboard" className={cn(buttonVariants(), "w-fit")}>
            Go to dashboard
          </Link>
        ) : (
          <Link href="/login" className={cn(buttonVariants(), "w-fit")}>
            Sign up — <span className="italic"> it's free</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomePage;
