import Link from "next/link";
import { Lesson } from "@/types";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

interface LessonSummaryProps {
  lesson: Lesson | null | undefined;
}

const LessonSummary = ({ lesson }: LessonSummaryProps) => {
  if (!lesson) return null;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-lg font-bold">{lesson.title}</h1>
        <div className="flex gap-2">
          <Badge variant="outline">{lesson.category}</Badge>
        </div>
      </div>
      <Link
        href={`/play?id=${lesson.id}`}
        className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
      >
        Play lesson
      </Link>
    </div>
  );
};

export { LessonSummary };
