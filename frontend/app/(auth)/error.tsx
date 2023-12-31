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
  const handleBackHome = () => {
    router.push("/");
    router.refresh();
  };
  return (
    <div className="container py-8 sm:py-12">
      <div className="flex gap-8 sm:items-center flex-col">
        <div className="max-w-[350px] sm:mx-auto">
          <Image src={Falling} alt="Falling Girl" />
        </div>
        <div className="space-y-4">
          <h1 className="font-bold text-3xl sm:text-center">
            Oops, We're Just Warming Up!
          </h1>
          <p className="text-muted-foreground sm:text-lg max-w-prose sm:text-center sm:mx-auto">
            Our free-tier backend services momentarily and are{" "}
            <span className="text-foreground">now rebooting</span>. This brief
            process,{" "}
            <span className="text-foreground">taking up to a minute</span>,
            helps optimize performance for a{" "}
            <span className="text-foreground">smoother user experience</span>.
            Please refresh the page shortly. Thanks for your understanding and
            patience.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => handleBackHome()}
          className="w-fit"
        >
          Back to home
        </Button>
      </div>
    </div>
  );
}
