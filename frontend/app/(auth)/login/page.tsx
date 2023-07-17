import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { cn } from "@/lib/utils";
import { authOptions } from "@/lib/auth";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { LoginButton } from "@/components/login-button";

const SignInPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");
  return (
    <div className="relative min-h-screen min-w-screen">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute top-4 left-4 gap-1 -translate-x-4 sm:translate-x-0"
        )}
      >
        <Icons.chevronLeft size={16} /> <span>Back</span>
      </Link>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4 sm:w-auto">
        <LoginButton />
      </div>
    </div>
  );
};

export default SignInPage;
