import { getPublicLessons } from "@/lib/lesson";

import { PageHeader } from "@/components/page-header";
import { PublicLessons } from "@/components/public-lessons";

const ExplorePage = async () => {
  const initialData = await getPublicLessons();
  if (typeof initialData === "string") return null;

  return (
    <div>
      <PageHeader heading="Explore" description="Discover public lessons">
        ExplorePage
      </PageHeader>

      <PublicLessons initialData={initialData} />
    </div>
  );
};

export default ExplorePage;
