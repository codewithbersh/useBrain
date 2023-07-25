import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getMyLessons } from "@/lib/lesson";
import { getServerSession } from "next-auth";

import { MyLessons } from "./components/my-lessons";
import { PageHeader } from "@/components/page-header";
import { PageSubHeader } from "@/components/page-subheader";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  const initialData = await getMyLessons(session.user.accessToken);
  return (
    <div className="space-y-8 ">
      <PageHeader
        heading="Dashboard"
        description="View and manage your dashboard."
      />

      <div className="space-y-6">
        <PageSubHeader
          heading="My lessons"
          description="Play and manage lessons"
        />
        <MyLessons
          accessToken={session.user.accessToken}
          initialData={initialData}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
