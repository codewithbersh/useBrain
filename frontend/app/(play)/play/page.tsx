import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getLesson } from "@/lib/lesson";
import { authOptions } from "@/lib/auth";

import { PlayClientContainer } from "./components/play-client-container";

interface PlayPageProps {
  searchParams: {
    id: string | undefined;
  };
}

const PlayPage = async ({ searchParams }: PlayPageProps) => {
  const id = searchParams.id;
  const session = await getServerSession(authOptions);
  if (!id) notFound();
  if (!session) redirect("/login");
  const lesson = await getLesson(id);
  if (typeof lesson === "string")
    throw Error("An error has occured. Please try again later.");
  if (!lesson.is_public && lesson.owner !== session.user.info.id) notFound();
  if (lesson.total_questions === 0) throw Error("No questions found.");

  return (
    <div>
      <PlayClientContainer lesson={lesson} session={session} />
    </div>
  );
};

export default PlayPage;
