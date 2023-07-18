import { Lesson } from "@/types";

import { Badge } from "@/components/ui/badge";

interface LessonSummaryProps {
  lesson: Lesson;
}

const LessonSummary = ({ lesson }: LessonSummaryProps) => {
  return (
    <div className="space-y-2">
      <h1 className="text-lg font-bold">{lesson.title}</h1>
      <div className="flex gap-2">
        <Badge variant="outline">{lesson.category}</Badge>
      </div>
    </div>
  );
};

export { LessonSummary };
