"use client";

import type { Session } from "next-auth";
import { useQuery } from "@tanstack/react-query";
import { getLessonDetail } from "@/lib/lesson";

import { LessonSummary } from "@/components/lesson-summary";
import { NewLessonForm } from "@/components/new-lesson-form";
import { PageSubHeader } from "@/components/page-subheader";
import { LessonQuestions } from "@/components/lesson-questions";

interface LessonClientContainerProps {
  id: string | undefined;
  session: Session;
}

const LessonClientContainer = ({ id, session }: LessonClientContainerProps) => {
  const accessToken = session.user.accessToken;
  const { data: lesson } = useQuery({
    queryKey: ["lesson", id],
    queryFn: () => getLessonDetail({ lessonId: id!, accessToken }),
    enabled: !!id,
  });
  const createOnlyView = id === undefined;
  const ownerOnlyView = lesson?.owner === session.user.info.id;

  return (
    <>
      {!ownerOnlyView && lesson && <LessonSummary lesson={lesson} />}
      {ownerOnlyView || createOnlyView ? (
        <NewLessonForm
          lessonId={id}
          userId={session.user.info.id}
          accessToken={session.user.accessToken}
          lesson={lesson}
        />
      ) : null}
      {ownerOnlyView && lesson && (
        <PageSubHeader
          heading="Questions"
          description="View and manage lesson questions"
        >
          <LessonQuestions lesson={lesson} />
        </PageSubHeader>
      )}
    </>
  );
};

export { LessonClientContainer };
