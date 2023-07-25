"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Lesson } from "@/types";
import { getPublicLessons } from "@/lib/lesson";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";

interface PublicLessonsProps {
  initialData: Lesson[];
}

const PublicLessons = ({ initialData }: PublicLessonsProps) => {
  const { data: lessons } = useQuery({
    queryKey: ["public-lessons"],
    queryFn: () => getPublicLessons(),
    initialData: initialData,
  });

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {typeof lessons !== "string" &&
        lessons.map((lesson) => (
          <Link passHref href={`/lesson?id=${lesson.id}`} key={lesson.id}>
            <Card className="overflow-hidden">
              <CardHeader className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  {lesson.category}
                </Badge>
                <CardTitle className="leading-[1.3] h-[93.59px] overflow-hidden">
                  {lesson.title}
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex gap-8">
                <div className="flex gap-2 items-center shrink-0">
                  <Icons.scrollText size={14} />
                  <small>{lesson.total_questions} Questions</small>
                </div>

                <div className="flex gap-2 items-center shrink-0">
                  <Icons.playCircle size={14} />
                  <small>{lesson.total_plays} Plays</small>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
    </div>
  );
};

export { PublicLessons };
