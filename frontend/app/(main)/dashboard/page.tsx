import { MyLessons } from "@/components/my-lessons";
import { PageHeader } from "@/components/page-header";
import { PageSubHeader } from "@/components/page-subheader";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="space-y-8">
      <PageHeader
        heading="Dashboard"
        description="View and manage your dashboard."
      />

      <PageSubHeader
        heading="My lessons"
        description="Play and manage your lessons"
      >
        {session && <MyLessons accessToken={session.user.accessToken} />}
      </PageSubHeader>
    </div>
  );
};

export default DashboardPage;
