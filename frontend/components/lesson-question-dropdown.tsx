"use client";

import { cn } from "@/lib/utils";

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

interface LessonQuestionDropdownProps {}

const LessonQuestionDropdown = ({}: LessonQuestionDropdownProps) => {
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

        <DropdownMenuItem asChild>
          <div className="space-x-3">
            <Icons.pencil size={14} />
            <span>Edit</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <div className="space-x-3">
            <Icons.trash size={14} /> <span>Delete</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { LessonQuestionDropdown };
