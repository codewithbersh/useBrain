import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getLessonDetail } from "@/lib/lesson";

import { PageHeader } from "@/components/page-header";
import { LessonClientContainer } from "@/components/lesson-client-container";

interface LessonProps {
  searchParams: {
    id: string | undefined;
  };
}

const Lesson = async ({ searchParams }: LessonProps) => {
  const { id } = searchParams;
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const lesson = id
    ? await getLessonDetail({
        lessonId: id,
        accessToken: session.user.accessToken,
      })
    : null;

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

      <LessonClientContainer id={id} session={session} initialData={lesson} />
    </div>
  );
};

export default Lesson;
