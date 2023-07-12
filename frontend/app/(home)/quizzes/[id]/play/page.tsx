import React from "react";
import { QuizGame } from "@/components/quiz-game";
import { Question } from "@/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface PlayPageProps {
  params: {
    id: string;
  };
}

async function getQuestions(quizId: string): Promise<Array<Question>> {
  const res = await fetch(
    `http://127.0.0.1:8000/api/quizzes/${quizId}/questions/`,
    { next: { revalidate: 0 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const PlayPage = async ({ params }: PlayPageProps) => {
  const session = await getServerSession(authOptions);
  const questions = await getQuestions(params.id);
  return (
    <div className="container">
      <QuizGame questions={questions} session={session} />
    </div>
  );
};

export default PlayPage;
