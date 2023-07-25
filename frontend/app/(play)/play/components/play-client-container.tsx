"use client";

import { usePlayState } from "@/hooks/use-play-state";
import { Session } from "next-auth/core/types";
import { Lesson } from "@/types";

import { InitialPlayState } from "./initial-play-state";
import { PlayingPlayState } from "./playing-play-state";
import { GameOverState } from "./game-over-state";

interface PlayClientContainerProps {
  lesson: Lesson;
  session: Session;
}

const PlayClientContainer = ({ lesson, session }: PlayClientContainerProps) => {
  const { playState } = usePlayState();

  return (
    <div>
      {playState === "initial" && <InitialPlayState />}
      {playState === "playing" && (
        <PlayingPlayState lesson={lesson} session={session} />
      )}
      {playState === "gameOver" && <GameOverState lesson={lesson} />}
    </div>
  );
};

export { PlayClientContainer };
