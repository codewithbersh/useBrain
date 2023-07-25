"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useNewHistory } from "@/hooks/use-new-history";
import { getLessonHistory } from "@/lib/history";
import { useQuery } from "@tanstack/react-query";
import { Lesson } from "@/types";
import { usePlayState } from "@/hooks/use-play-state";
import Success from "@/public/success.svg";
import { Balancer } from "react-wrap-balancer";

import { Button } from "@/components/ui/button";

interface GameOverStateProps {
  lesson: Lesson;
}

const GameOverState = ({ lesson }: GameOverStateProps) => {
  const { history: newHistory, setHistory } = useNewHistory();
  const { setPlayState } = usePlayState();
  const { data: history } = useQuery({
    queryKey: ["history", lesson.id],
    queryFn: () => getLessonHistory({ lessonId: lesson.id }),
    enabled: !!newHistory,
  });
  const router = useRouter();

  if (typeof newHistory === "string") return null;
  if (typeof history === "string" || typeof history === "undefined")
    return null;

  const totalScores = history.map((score) => score.total_correct_answers);
  totalScores.sort((a, b) => a - b);
  const scoresBelowMine = totalScores.filter(
    (score) => score < newHistory.total_correct_answers
  ).length;
  const scoresEqualToMine = totalScores.filter(
    (score) => score === newHistory.total_correct_answers
  ).length;
  const percentileRank =
    ((scoresBelowMine + 0.5 * scoresEqualToMine) / totalScores.length) * 100;

  const points =
    (newHistory.total_correct_answers / newHistory.total_questions) * 100;

  const handlePlayAgain = () => {
    setHistory("");
    setPlayState("initial");
  };

  const handleExit = () => {
    router.push(`/lesson?id=${lesson.id}`);
  };

  return (
    <div className="container">
      <div className="py-8 max-w-[400px] mx-auto space-y-4 sm:space-y-6">
        <div className="space-y-4">
          <h1 className=" uppercase font-bold tracking-widest text-center">
            Game Over
          </h1>
          <div className="text-center">
            <h1 className="text-5xl font-bold">{points}</h1>
            <small>points</small>
          </div>
        </div>

        <Image src={Success} alt="Success icon" />

        <div className="flex justify-between px-8">
          <div>
            <h1 className="text-muted-foreground font-medium">Score</h1>
            <p className="font-bold">
              {newHistory.total_correct_answers} out of{" "}
              {newHistory.total_questions}
            </p>
          </div>
          <div>
            <h1 className="text-muted-foreground font-medium">
              Percentile Rank
            </h1>
            <p className="font-bold">{percentileRank.toFixed(2)}</p>
          </div>
        </div>

        <p className="font-medium text-center px-8 py-2 sm:text-lg italic">
          <Balancer>
            You outperformed {percentileRank.toFixed(2)}% of players in this
            game.
          </Balancer>
        </p>

        <div className="flex flex-col gap-4 px-8">
          <Button onClick={() => handlePlayAgain()}>Play again</Button>
          <Button variant="outline" onClick={() => handleExit()}>
            Exit
          </Button>
          <small className="text-center text-muted-foreground">
            Illustrations by{" "}
            <Link
              className="underline"
              href="https://popsy.co/illustrations"
              target="_blank"
            >
              Popsy
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export { GameOverState };
