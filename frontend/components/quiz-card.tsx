import { Quiz } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";

interface QuizCardProps {
  quiz: Quiz;
}

const QuizCard = ({ quiz }: QuizCardProps) => {
  return (
    <Card className="overflow-hidden  hover:shadow-md transition-shadow max-w-[300px]">
      <CardHeader className="p-0 py-2  bg-foreground">
        <small className=" text-center text-background leading-none font-bold">
          {quiz.category.name}
        </small>
      </CardHeader>
      <CardContent className="px-4 py-2 space-y-2">
        <Badge>{quiz.difficulty}</Badge>
        <p className="font-medium line-clamp-2 h-12">{quiz.title}</p>
      </CardContent>
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
      <CardFooter className="flex items-center justify-end pb-0 py-2">
        <Button size="sm" variant="link">
          Learn more
        </Button>
        <Button size="sm" variant="outline">
          Play
        </Button>
      </CardFooter>
    </Card>
  );
};

export { QuizCard };
