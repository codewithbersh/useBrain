import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { Icons } from "./icons";

const LessonQuestions = () => {
  return (
    <div className="space-y-4">
      <Link
        href="/lesson"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "w-full gap-2 border-dashed text-muted-foreground"
        )}
      >
        <Icons.plusCircle size={16} />
        Add new question
      </Link>
    </div>
  );
};

export { LessonQuestions };
