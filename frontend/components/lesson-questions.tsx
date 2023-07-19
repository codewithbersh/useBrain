"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Lesson } from "@/types";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { LessonQuestionDropdown } from "@/components/lesson-question-dropdown";

interface LessonQuestionsProps {
  lesson: Lesson;
}

const LessonQuestions = ({ lesson }: LessonQuestionsProps) => {
  const questions = lesson.questions;
  return (
    <div className="space-y-4">
      <Link
        href="/lesson"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "w-full gap-2 border-dashed text-muted-foreground"
        )}
      >
        <Icons.plusCircle size={16} />
        Add new question
      </Link>

      {questions.map((question) => (
        <div
          key={question.id}
          className="flex justify-between items-center gap-8 py-2 px-4 border-border border rounded-md"
        >
          <h1 className="font-bold">{question.question_text}</h1>
          <LessonQuestionDropdown />
        </div>
      ))}
    </div>
  );
};

export { LessonQuestions };
