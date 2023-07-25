"use client";

import { useEffect } from "react";
import type { Session } from "next-auth";
import { useQuery } from "@tanstack/react-query";
import { getLessonDetail } from "@/lib/lesson";
import { Lesson } from "@/types";
import { getLessonHistory } from "@/lib/history";
import { usePlayState } from "@/hooks/use-play-state";

import { LessonSummary } from "./lesson-summary";
import { NewLessonForm } from "./new-lesson-form";
import { LessonQuestions } from "./lesson-questions";
import { LessonHistory } from "./lesson-history";

interface LessonClientContainerProps {
  id: string | undefined;
  session: Session;
  initialData: Lesson | null;
}

const LessonClientContainer = ({
  id,
  session,
  initialData,
}: LessonClientContainerProps) => {
  const accessToken = session.user.accessToken;
  const { setPlayState } = usePlayState();
  useEffect(() => {
    setPlayState("initial");
  }, []);
  const { data: lesson } = useQuery({
    queryKey: ["lesson", id],
    queryFn: () => getLessonDetail({ lessonId: id!, accessToken }),
    enabled: !!id,
    initialData: initialData,
  });
  const createOnlyView = id === undefined;
  const ownerOnlyView = lesson?.owner === session.user.info.id;

  const { data: history } = useQuery({
    queryKey: ["history", lesson?.id],
    queryFn: () => getLessonHistory({ lessonId: lesson!.id }),
    enabled: !!lesson,
  });

  return (
    <div className="space-y-16">
      {lesson && <LessonSummary lesson={lesson} />}
      {ownerOnlyView || createOnlyView ? (
        <NewLessonForm
          lessonId={id}
          userId={session.user.info.id}
          accessToken={session.user.accessToken}
          lesson={lesson}
        />
      ) : null}
      {ownerOnlyView && lesson && <LessonQuestions lesson={lesson} />}
      {!createOnlyView && typeof history === "object" && (
        <LessonHistory history={history} />
      )}
    </div>
  );
};

export { LessonClientContainer };
