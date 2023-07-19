import { Lesson } from "@/types";
import { LessonOptionsDropdown } from "@/components/lesson-options-dropdown";

interface MyLessonProps {
  lesson: Lesson;
}
const MyLesson = ({ lesson }: MyLessonProps) => {
  return (
    <div className="flex justify-between items-center gap-8 py-2 px-4 border-border border rounded-md">
      <div className=" ">
        <h1 className="font-medium  line-clamp-1">{lesson.title}</h1>
        <p className="text-muted-foreground">
          {lesson.total_questions} Questions
        </p>
      </div>

      <LessonOptionsDropdown lesson={lesson} />
    </div>
  );
};

export { MyLesson };
