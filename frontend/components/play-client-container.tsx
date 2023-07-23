"use client";

import { usePlayState } from "@/hooks/use-play-state";
import { Lesson } from "@/types";

import { InitialPlayState } from "@/components/initial-play-state";
import { PlayingPlayState } from "@/components/playing-play-state";

interface PlayClientContainerProps {
  lesson: Lesson;
}

const PlayClientContainer = ({ lesson }: PlayClientContainerProps) => {
  const { playState } = usePlayState();

  return (
    <div>
      {playState === "initial" && <InitialPlayState />}
      {playState === "playing" && <PlayingPlayState lesson={lesson} />}
    </div>
  );
};

export { PlayClientContainer };
