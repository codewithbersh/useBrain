"use client";

import { Lesson } from "@/types";
import { useManageQuestionModal } from "@/hooks/use-manage-question-modal";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { LessonQuestionDropdown } from "@/components/lesson-question-dropdown";
import { PageSubHeader } from "@/components/page-subheader";

interface LessonQuestionsProps {
  lesson: Lesson;
}

const LessonQuestions = ({ lesson }: LessonQuestionsProps) => {
  const { onOpen, setQuestion } = useManageQuestionModal();
  const questions = lesson.questions;
  const handleAddNewQuestion = () => {
    onOpen();
    setQuestion(null);
  };
  return (
    <div className="space-y-6">
      <PageSubHeader
        heading="Questions"
        description="View and manage lesson questions"
      />
      <div className="space-y-4">
        <Button
          variant="outline"
          className="w-full gap-2 border-dashed text-muted-foreground"
          onClick={() => handleAddNewQuestion()}
        >
          <Icons.plusCircle size={16} />
          Add new question
        </Button>
        {questions.map((question) => (
          <div
            key={question.id}
            className="flex justify-between items-center gap-8 py-2 px-4 border-border border rounded-md"
          >
            <h1 className="font-medium">{question.question_text}</h1>
            <LessonQuestionDropdown question={question} />
          </div>
        ))}
      </div>
    </div>
  );
};

export { LessonQuestions };
