"use client";

import { useEffect, useState } from "react";
import { usePlayState } from "@/hooks/use-play-state";

const InitialPlayState = () => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const { setPlayState } = usePlayState();

  useEffect(() => {
    setCountdown(3);
  }, []);

  useEffect(() => {
    if (countdown !== null && countdown > -1) {
      const timerId = setTimeout(() => {
        setCountdown(countdown - 1);
        if (countdown - 1 === -1) {
          setPlayState("playing");
        }
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [countdown, setPlayState]);
  return (
    <div className="grid place-items-center w-screen h-screen">
      <h1 className="text-9xl font-black animate-bounce duration-1000">
        {countdown}
      </h1>
    </div>
  );
};

export { InitialPlayState };
