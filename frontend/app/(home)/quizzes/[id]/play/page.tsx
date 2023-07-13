import { QuizGame } from "@/components/quiz-game";
import { QuizGameModal } from "@/components/quiz-game-modal";
import { getQuestions } from "@/lib/questions-api";
import { notFound } from "next/navigation";

interface PlayPageProps {
  params: {
    id: string;
  };
}

const PlayPage = async ({ params }: PlayPageProps) => {
  const questions = await getQuestions(params.id);

  if (!questions) notFound();
  return (
    <div className="container">
      <QuizGame questions={questions} />
      <QuizGameModal id={params.id} />
    </div>
  );
};

export default PlayPage;
