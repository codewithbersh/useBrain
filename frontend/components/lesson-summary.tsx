"use client";

import { useRouter } from "next/navigation";
import { Lesson } from "@/types";
import { usePlayState } from "@/hooks/use-play-state";

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
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-lg font-bold">{lesson.title}</h1>
        <div className="flex gap-2">
          <Badge variant="outline">{lesson.category}</Badge>
        </div>
      </div>
      <Button size="sm" variant="outline" onClick={() => handlePlayLesson()}>
        Play lesson
      </Button>
    </div>
  );
};

export { LessonSummary };
