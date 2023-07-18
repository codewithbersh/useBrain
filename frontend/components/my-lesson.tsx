import Link from "next/link";
import { cn } from "@/lib/utils";
import { Lesson } from "@/types";

import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "shrink-0"
          )}
        >
          <Icons.moreVertical size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="-translate-x-8">
          <DropdownMenuLabel className="pr-8">Lesson Options</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href={`/lesson?id=${lesson.id}`} className="space-x-3">
              <Icons.playCircle size={14} /> <span>Play</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/lesson?id=${lesson.id}`} className="space-x-3">
              <Icons.settings2 size={14} /> <span>Manage</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/lesson?id=${lesson.id}`} className="space-x-3">
              <Icons.trash size={14} /> <span>Delete</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export { MyLesson };
