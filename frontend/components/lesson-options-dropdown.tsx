"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Lesson } from "@/types";
import { useDeleteLessonModal } from "@/hooks/use-delete-lesson-modal";
import { usePlayState } from "@/hooks/use-play-state";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface LessonOptionsDropdownProps {
  lesson: Lesson;
}

const LessonOptionsDropdown = ({ lesson }: LessonOptionsDropdownProps) => {
  const { onOpen, setLesson } = useDeleteLessonModal();
  const { setPlayState } = usePlayState();
  const router = useRouter();
  const handleSelectDelete = () => {
    onOpen();
    setLesson(lesson);
  };

  const handleSelectPlay = (id: string) => {
    setPlayState("initial");
    router.push(`/play?id=${id}`);
  };

  return (
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

        <DropdownMenuItem
          asChild
          onSelect={() => handleSelectPlay(lesson.id)}
          disabled={lesson.questions.length === 0}
        >
          <div className="space-x-3">
            <Icons.playCircle size={14} /> <span>Play</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/lesson?id=${lesson.id}`} className="space-x-3">
            <Icons.settings2 size={14} /> <span>Manage</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild onSelect={() => handleSelectDelete()}>
          <div className="space-x-3">
            <Icons.trash size={14} /> <span>Delete</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { LessonOptionsDropdown };
