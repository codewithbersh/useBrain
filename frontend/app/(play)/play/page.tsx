import { notFound } from "next/navigation";
import { getPublicLesson } from "@/lib/lesson";

import { PlayClientContainer } from "@/components/play-client-container";

interface PlayPageProps {
  searchParams: {
    id: string | undefined;
  };
}

const PlayPage = async ({ searchParams }: PlayPageProps) => {
  const id = searchParams.id;
  if (!id) notFound();
  const lesson = await getPublicLesson(id);
  if (typeof lesson === "string") throw Error("An error has occured");

  return (
    <div>
      <PlayClientContainer lesson={lesson} />
    </div>
  );
};

export default PlayPage;
