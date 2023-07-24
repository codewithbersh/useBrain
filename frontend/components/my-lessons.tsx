"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { getMyLessons } from "@/lib/lesson";
import { Lesson } from "@/types";

import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { MyLesson } from "@/components/my-lesson";

interface MyLessonsProps {
  accessToken: string;
  initialData: Lesson[] | null;
}

const MyLessons = ({ accessToken, initialData }: MyLessonsProps) => {
  const { data: lessons } = useQuery({
    queryKey: ["my-lessons"],
    queryFn: () => getMyLessons(accessToken),
    enabled: !!accessToken,
    initialData: initialData,
  });

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
        Add new lesson
      </Link>

      {lessons &&
        lessons.map((lesson) => <MyLesson key={lesson.id} lesson={lesson} />)}
    </div>
  );
};

export { MyLessons };
