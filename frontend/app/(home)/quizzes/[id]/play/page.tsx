import { QuizGame } from "@/components/quiz-game";
import { getQuestions } from "@/lib/questions-api";

interface PlayPageProps {
  params: {
    id: string;
  };
}

const PlayPage = async ({ params }: PlayPageProps) => {
  const questions = await getQuestions(params.id);
  return (
    <div className="container">
      <QuizGame questions={questions} />
    </div>
  );
};

export default PlayPage;
