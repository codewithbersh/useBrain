import { Quiz } from "@/types";
import { QuizCard } from "./quiz-card";

interface QuizzesProps {
  quizzes: Quiz[];
}

const Quizzes = ({ quizzes }: QuizzesProps) => {
  return (
    <div className="flex flex-wrap gap-4 lg:gap-11">
      {quizzes.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </div>
  );
};

export { Quizzes };
