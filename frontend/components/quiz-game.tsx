"use client";

import { Question } from "@/types";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuizGameModalState, useUserNicknameState } from "@/state/quiz-game";
import { signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { QuizGameModal } from "./quiz-game-modal";

interface QuizGameProps {
  questions: Question[];
  session: Session | null;
}

const QuizGame = ({ questions, session }: QuizGameProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!answerSubmitted) {
      setSelectedAnswer(event.target.value);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setAnswerSubmitted(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Game over! Your score is ${score}`);
    }
  };

  const handleSubmit = () => {
    if (
      questions[currentQuestionIndex].choices.find(
        (choice) => choice.id === selectedAnswer
      )?.is_correct
    ) {
      setScore(score + 1);
    }
    setAnswerSubmitted(true);
  };

  return (
    <div>
      <Card className="max-w-[500px] mx-auto">
        <CardHeader>
          <h1 className="font-bold text-2xl text-center">
            {questions[0].quiz.title}
          </h1>
        </CardHeader>
        <CardHeader className=" p-2 pb-4">
          <h1 className="font-bold text-4xl text-center">{score}</h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>{questions[currentQuestionIndex].question_text}</p>

          <div className=" grid grid-cols-2 gap-4">
            {questions[currentQuestionIndex].choices.map((choice) => (
              <div
                key={choice.id}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "p-0 overflow-hidden",
                  {
                    "bg-accent text-accent-foreground":
                      selectedAnswer === choice.id && !answerSubmitted,
                    "border-destructive text-destructive hover:text-destructive bg-rose-50 hover:bg-rose-50":
                      answerSubmitted &&
                      selectedAnswer === choice.id &&
                      !choice.is_correct,
                    "bg-green-50 border-emerald-600 text-emerald-600 hover:text-emerald-600 hover:bg-emerald-50":
                      answerSubmitted &&
                      selectedAnswer === choice.id &&
                      choice.is_correct,
                  }
                )}
              >
                <input
                  type="radio"
                  id={choice.id}
                  name="quiz"
                  value={choice.id}
                  onChange={handleAnswerChange}
                  disabled={answerSubmitted}
                  className="hidden"
                />
                <label
                  htmlFor={choice.id}
                  className={cn("w-full h-full px-4 py-2 cursor-pointer")}
                >
                  {choice.choice_text}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          {selectedAnswer !== null && !answerSubmitted && (
            <Button onClick={handleSubmit}>Submit Answer</Button>
          )}

          {answerSubmitted && (
            <Button onClick={handleNextQuestion}>Next</Button>
          )}
        </CardFooter>
      </Card>
      <Button onClick={() => signOut()}>Signout</Button>
      <QuizGameModal
        session={session}
        id={questions[currentQuestionIndex].quiz.id}
      />
    </div>
  );
};

export { QuizGame };
