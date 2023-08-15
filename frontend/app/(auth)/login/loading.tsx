import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Loading = () => {
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
        <div className="w-[300px] mx-auto space-y-12">
          <div className="flex gap-4 flex-col justify-center items-center text-center">
            <Icons.logo size={28} />
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold leading-none">
                Welcome back
              </h1>
              <p className="text-muted-foreground">Sign-in below to continue</p>
            </div>
          </div>
          <div className="w-full space-y-6">
            <Skeleton className="w-full h-10" />

            <div className="flex items-center gap-4">
              <hr className="w-full" />
              <small className="text-muted-foreground font-medium">OR</small>
              <hr className="w-full" />
            </div>
            <Skeleton className="w-full h-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
