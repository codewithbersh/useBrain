import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import CrashedError from "@/public/crashed-error.svg";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container py-8 sm:py-12">
      <div className="space-y-8">
        <div className="max-w-[350px] sm:mx-auto">
          <Image src={CrashedError} alt="Crashed Error" />
        </div>
        <div className="space-y-4">
          <h1 className="font-bold text-3xl sm:text-center">Page Not Found</h1>
          <p className="text-muted-foreground sm:text-lg max-w-prose sm:text-center sm:mx-auto">
            Sorry, the page you were looking for doesn’t exist or has been
            moved.
          </p>
        </div>
        <div className="flex gap-4 sm:justify-center">
          <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
            Back to home
          </Link>
          <Link href="/dashboard" className={cn(buttonVariants())}>
            View dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
