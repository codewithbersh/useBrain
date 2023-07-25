"use client";

import { useRouter } from "next/navigation";
import { Lesson } from "@/types";
import { usePlayState } from "@/hooks/use-play-state";
import { Balancer } from "react-wrap-balancer";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LessonSummaryProps {
  lesson: Lesson | null | undefined;
}

const LessonSummary = ({ lesson }: LessonSummaryProps) => {
  const { setPlayState } = usePlayState();
  const router = useRouter();
  if (!lesson) return null;

  const handlePlayLesson = () => {
    setPlayState("initial");
    router.push(`/play?id=${lesson.id}`);
  };

  return (
    <div className="flex flex-col border-border p-4 border rounded-md space-y-4">
      <h1 className="text-lg font-bold  ">
        <Balancer>{lesson.title}</Balancer>
      </h1>
      <div className="flex gap-4">
        <Badge variant="secondary">{lesson.category}</Badge>
        <Badge variant="secondary">
          {lesson.total_questions}{" "}
          {lesson.total_questions > 1 ? "Questions" : "Question"}
        </Badge>
      </div>
      <Button
        className="shrink-0 gap-2"
        size="sm"
        onClick={() => handlePlayLesson()}
        disabled={lesson.questions.length === 0}
      >
        Play lesson
      </Button>
    </div>
  );
};

export { LessonSummary };
