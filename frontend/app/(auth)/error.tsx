"use client";

import Falling from "@/public/falling.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <div className="container py-8 sm:py-12">
      <div className="space-y-8">
        <div className="max-w-[350px] sm:mx-auto">
          <Image src={Falling} alt="Falling Girl" />
        </div>
        <div className="space-y-4">
          <h1 className="font-bold text-3xl sm:text-center">
            Oops, We're Just Warming Up!
          </h1>
          <p className="text-muted-foreground sm:text-lg max-w-prose sm:text-center sm:mx-auto">
            Our free-tier backend services momentarily spin down during
            inactivity and are now rebooting. This brief process, taking up to a
            minute, helps optimize performance for a smoother user experience.
            Please refresh the page shortly. Thanks for your understanding and
            patience.
          </p>
        </div>
        <div className="flex gap-4 sm:justify-center">
          <Button variant="outline" onClick={() => router.push("/")}>
            Back to home
          </Button>
          <Button onClick={() => handleReload()}>Try again</Button>
        </div>
      </div>
    </div>
  );
}
