import { Lesson } from "@/types";
import { LessonOptionsDropdown } from "@/components/lesson-options-dropdown";
import { Card } from "./ui/card";

interface MyLessonProps {
  lesson: Lesson;
}
const MyLesson = ({ lesson }: MyLessonProps) => {
  return (
    <Card className="flex gap-8 px-4 py-2">
      <div className="flex-1">
        <h1 className="font-medium break-all line-clamp-2">{lesson.title}</h1>
        <p className="text-muted-foreground">
          {lesson.total_questions} Questions
        </p>
      </div>

      <LessonOptionsDropdown lesson={lesson} />
    </Card>
  );
};

export { MyLesson };
