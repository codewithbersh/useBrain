"use client";

import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useQuizGameState } from "@/state/quiz-game";
import { Quiz } from "@/types";

interface GameOverModalProps {
  score: number;
  quiz: Quiz;
}

const GameOverModal = ({ score, quiz }: GameOverModalProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const { gameState, setGameState } = useQuizGameState();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <AlertDialog open={gameState === "gameOver"}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Game over</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { GameOverModal };
