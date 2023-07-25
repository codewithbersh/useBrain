"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Balancer } from "react-wrap-balancer";
import { usePlayState } from "@/hooks/use-play-state";
import { useExitGameModal } from "@/hooks/use-exit-game-modal";
import { shuffleArray } from "@/lib/shuffle-array";
import { Lesson, Question } from "@/types";

import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Icons } from "@/components/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newHistory } from "@/lib/history";
import { Session } from "next-auth/core/types";
import { useNewHistory } from "@/hooks/use-new-history";

interface PlayingPlayStateProps {
  lesson: Lesson;
  session: Session;
}

const PlayingPlayState = ({ lesson, session }: PlayingPlayStateProps) => {
  const { setPlayState } = usePlayState();
  const { onOpen, setLessonId } = useExitGameModal();
  const { setHistory } = useNewHistory();
  const [questions, setQuestions] = useState<Question[] | undefined>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const queryClient = useQueryClient();

  const newHistoryMutation = useMutation({
    mutationFn: newHistory,
    onSuccess: (values) => {
      queryClient.invalidateQueries({ queryKey: ["history", lesson.id] });
      setHistory(values);
    },
  });

  useEffect(() => {
    const shuffledQuestions = JSON.parse(JSON.stringify(lesson.questions));

    for (let question of shuffledQuestions) {
      question.choices = shuffleArray(question.choices);
    }

    setQuestions(shuffleArray(shuffledQuestions));
  }, []);

  const handleExitButton = () => {
    onOpen();
    setLessonId(lesson.id);
  };

  if (!questions || questions.length === 0) return null;

  const choices = questions[currentQuestionIndex].choices;

  const handleAnswerChange = (id: string) => {
    if (!answerSubmitted) {
      setSelectedAnswer(id);
    }
  };

  const handleSubmitAnswer = () => {
    if (
      questions[currentQuestionIndex].choices.find(
        (choice) => choice.id === selectedAnswer
      )?.is_correct
    ) {
      setScore(score + 1);
    }
    setAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    setAnswerSubmitted(false);
    setSelectedAnswer(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const history = {
        player: session.user.info.id,
        lesson: lesson.id,
        total_questions: questions.length,
        total_correct_answers: score,
      };
      newHistoryMutation.mutate({
        history: history,
        accessToken: session.user.accessToken,
      });
      setPlayState("gameOver");
    }
  };

  const currentProgress = (index: number, length: number) => {
    return ((index + 1) / length) * 100;
  };

  return (
    <div className="container py-8 relative">
      <Button
        variant="ghost"
        size="icon"
        className="-translate-x-4"
        onClick={() => handleExitButton()}
      >
        <Icons.chevronLeft size={20} />
      </Button>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex flex-col gap-2">
          <small className="text-center font-medium">
            {currentQuestionIndex + 1}/{questions.length}
          </small>
          <Progress
            value={currentProgress(currentQuestionIndex, questions.length)}
            className="w-3/4 mx-auto"
          />
        </div>
        <div className="grid place-items-center w-full rounded-md h-[300px] bg-slate-50">
          <h1 className="text-xl sm:text-2xl font-bold text-center px-8">
            <Balancer>{questions[currentQuestionIndex].question_text}</Balancer>
          </h1>
        </div>
        <div className="space-y-6 text-center">
          <div className="grid gap-4 sm:grid-cols-2">
            {choices.map((choice) => (
              <div
                key={choice.id}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  selectedAnswer === choice.id &&
                    "text-accent-foreground bg-accent",
                  {
                    "bg-accent text-accent-foreground":
                      selectedAnswer === choice.id && !answerSubmitted,
                    "border-destructive text-destructive hover:text-destructive bg-white hover:bg-white":
                      answerSubmitted &&
                      selectedAnswer === choice.id &&
                      !choice.is_correct,
                    " border-green-500 bg-green-500 text-white hover:bg-green-500 ":
                      answerSubmitted &&
                      selectedAnswer === choice.id &&
                      choice.is_correct,
                  },
                  answerSubmitted &&
                    choice.is_correct &&
                    "border-green-500 bg-green-500 text-white hover:bg-green-500 ",
                  "cursor-pointer"
                )}
                onClick={() => handleAnswerChange(choice.id)}
              >
                {choice.choice_text}
              </div>
            ))}
          </div>
          {answerSubmitted ? (
            <Button
              className="w-full sm:max-w-[328px] ml-auto"
              onClick={() => handleNextQuestion()}
            >
              {currentQuestionIndex + 1 === questions.length
                ? "View score"
                : "Next question"}
            </Button>
          ) : (
            <Button
              className="w-full sm:max-w-[328px] ml-auto"
              disabled={!selectedAnswer}
              onClick={() => handleSubmitAnswer()}
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export { PlayingPlayState };
