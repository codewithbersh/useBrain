import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getLessonDetail } from "@/lib/lesson";

import { LessonSummary } from "@/components/lesson-summary";
import { NewLessonForm } from "@/components/new-lesson-form";
import { PageHeader } from "@/components/page-header";

interface LessonProps {
  searchParams: {
    id: string | undefined;
  };
}

const Lesson = async ({ searchParams }: LessonProps) => {
  const { id } = searchParams;

  const session = await getServerSession(authOptions);
  const lesson = id ? await getLessonDetail(id) : null;

  const createOnlyView = id === undefined;
  const privateOnlyView = lesson?.owner === session?.user.info.id;
  const publicOnlyView = lesson?.owner !== session?.user.info.id;
  return (
    <div>
      <PageHeader
        heading="Lesson"
        description={"View, manage, create, and play lessons."}
      />

      {publicOnlyView && lesson && <LessonSummary lesson={lesson} />}

      {privateOnlyView || createOnlyView ? (
        <NewLessonForm lessonId={id} />
      ) : null}
    </div>
  );
};

export default Lesson;
