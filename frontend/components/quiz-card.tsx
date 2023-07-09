import { Quiz } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

interface QuizCardProps {
  quiz: Quiz;
}

const QuizCard = ({ quiz }: QuizCardProps) => {
  return (
    <Link passHref href={`quizzes/${quiz.id}`} className="w-[300px]">
      <Card className="overflow-hidden  hover:shadow-md transition-shadow ">
        <CardHeader className="p-0 py-2  bg-foreground">
          <small className=" text-center text-background leading-none font-bold">
            {quiz.category.name}
          </small>
        </CardHeader>
        <CardContent className="px-4 py-2 space-y-2">
          <Badge>{quiz.difficulty}</Badge>
          <p className="font-medium line-clamp-2 h-12">{quiz.title}</p>
        </CardContent>
        <Separator />
        <CardFooter className="p-0 px-4 py-4 flex gap-6">
          <div className="flex gap-2 items-center">
            <Icons.fileQuestion size={16} />
            <small className=" text-sm leading-none">
              {quiz.questions_count} Questions
            </small>
          </div>
          <div className="flex gap-2 items-center">
            <Icons.playCircle size={16} />
            <small className=" text-sm leading-none">
              {quiz.times_played} Plays
            </small>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export { QuizCard };
