import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { getQuiz } from "@/lib/quizzes-api";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface QuizDetailProps {
  params: {
    id: string;
  };
}

const QuizDetail = async ({ params }: QuizDetailProps) => {
  const quiz = await getQuiz({ id: params.id });

  return (
    <div className="container grid md:grid-cols-12 gap-4">
      <div className="md:col-span-2">
        <Link
          href="/quizzes"
          className={cn(buttonVariants({ variant: "ghost" }), "gap-2")}
        >
          <Icons.arrowLeftCircle size={24} />
        </Link>
      </div>
      <div className="md:col-span-8 mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className=" text-2xl font-bold">{quiz.title}</h1>
          <p className="max-w-prose">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque,
            perspiciatis unde fuga, officiis cumque eum alias quos quam.
          </p>
          <div className="space-x-4">
            <Badge variant="outline">{quiz.difficulty}</Badge>
            <Badge variant="outline">{quiz.category.name}</Badge>
          </div>
        </div>
        <div>
          <Link
            href={`/quizzes/${quiz.id}/play`}
            className={cn(buttonVariants())}
          >
            Play
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizDetail;
