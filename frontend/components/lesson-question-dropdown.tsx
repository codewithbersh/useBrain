"use client";

import { cn } from "@/lib/utils";
import { useManageQuestionModal } from "@/hooks/use-manage-question-modal";
import { useDeleteQuestionModal } from "@/hooks/use-delete-question-modal";
import { Question } from "@/types";

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

interface LessonQuestionDropdownProps {
  question: Question;
}

const LessonQuestionDropdown = ({ question }: LessonQuestionDropdownProps) => {
  const { onOpen, setQuestion } = useManageQuestionModal();
  const { onOpen: onOpenDelete, setQuestion: setQuestionDelete } =
    useDeleteQuestionModal();
  const handleSelectEdit = () => {
    onOpen();
    setQuestion(question);
  };

  const handleSelectDelete = () => {
    onOpenDelete();
    setQuestionDelete(question);
    console.log("hell");
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
        <DropdownMenuLabel className="pr-8">Question Options</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild onSelect={() => handleSelectEdit()}>
          <div className="space-x-3">
            <Icons.pencil size={14} />
            <span>Edit</span>
          </div>
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

export { LessonQuestionDropdown };
