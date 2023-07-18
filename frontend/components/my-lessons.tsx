"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { getMyLessons } from "@/lib/lesson";

import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { MyLesson } from "@/components/my-lesson";

interface MyLessonsProps {
  accessToken: string;
}

const MyLessons = ({ accessToken }: MyLessonsProps) => {
  const { data: lessons } = useQuery({
    queryKey: ["my-lessons"],
    queryFn: () => getMyLessons(accessToken),
    enabled: !!accessToken,
  });

  return (
    <div className="space-y-4">
      <Link
        href="/lesson"
        className={cn(buttonVariants({ variant: "outline" }), "w-full gap-2")}
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
