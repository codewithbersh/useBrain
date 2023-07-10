import React from "react";
import { getQuizzes } from "@/lib/quizzes-api";
import { Quizzes } from "@/components/quizzes";

const QuizzesPage = async () => {
  const quizzes = await getQuizzes();
  return (
    <div className="container space-y-4">
      <section>
        <h1 className="text-2xl font-bold">Explore Quizzes</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas
          placeat minus ipsam.
        </p>
      </section>

      <div className=" flex flex-wrap gap-4">
        <Quizzes quizzes={quizzes} />
      </div>
    </div>
  );
};

export default QuizzesPage;
