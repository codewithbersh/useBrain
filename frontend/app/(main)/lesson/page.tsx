import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getLessonDetail } from "@/lib/lesson";

import { LessonSummary } from "@/components/lesson-summary";
import { NewLessonForm } from "@/components/new-lesson-form";
import { PageHeader } from "@/components/page-header";
import { PageSubHeader } from "@/components/page-subheader";
import { LessonQuestions } from "@/components/lesson-questions";

interface LessonProps {
  searchParams: {
    id: string | undefined;
  };
}

const Lesson = async ({ searchParams }: LessonProps) => {
  const { id } = searchParams;

  const session = await getServerSession(authOptions);
  const lesson = id ? await getLessonDetail(id) : null;

  if (!session) return null;

  const createOnlyView = id === undefined;
  const ownerOnlyView = lesson?.owner === session.user.info.id;

  return (
    <div className="space-y-8">
      <PageHeader
        heading="Lesson"
        description={
          createOnlyView
            ? "Create new lesson"
            : ownerOnlyView
            ? "View and manage lesson"
            : "View and play lesson."
        }
      />

      {!ownerOnlyView && lesson && <LessonSummary lesson={lesson} />}

      {ownerOnlyView || createOnlyView ? (
        <NewLessonForm lessonId={id} userId={session.user.info.id} />
      ) : null}

      {ownerOnlyView && (
        <PageSubHeader
          heading="Questions"
          description="View and manage lesson questions"
        >
          <LessonQuestions />
        </PageSubHeader>
      )}
    </div>
  );
};

export default Lesson;
