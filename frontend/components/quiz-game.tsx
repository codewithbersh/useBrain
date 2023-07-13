"use client";

import { useState } from "react";
import { Question } from "@/types";
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { useQuizGameState } from "@/state/quiz-game";
import { Balancer } from "react-wrap-balancer";

interface QuizGameProps {
  questions: Question[];
}

const QuizGame = ({ questions }: QuizGameProps) => {
  const { gameState } = useQuizGameState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  // update this to a loading skeleton later
  if (gameState === "initial") {
    return "loading...";
  }

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
        <CardHeader className="flex items-center justify-between flex-row space-y-0">
          <small className="text-muted-foreground">
            {questions[0].quiz.title}
          </small>

          <small>
            {currentQuestionIndex + 1}/{questions.length}
          </small>
        </CardHeader>

        <CardContent className="py-8 space-y-12">
          <h1 className="text-center text-2xl font-bold">
            <Balancer>{questions[currentQuestionIndex].question_text}</Balancer>
          </h1>

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
          {answerSubmitted ? (
            <Button onClick={handleNextQuestion}>Next</Button>
          ) : (
            <Button disabled={selectedAnswer === null} onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export { QuizGame };
