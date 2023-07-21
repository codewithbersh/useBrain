import { MyLessons } from "@/components/my-lessons";
import { PageHeader } from "@/components/page-header";
import { PageSubHeader } from "@/components/page-subheader";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return (
    <div className="space-y-8 ">
      <PageHeader
        heading="Dashboard"
        description="View and manage your dashboard."
      />

      <PageSubHeader
        heading="My lessons"
        description="Play and manage your lessons"
      >
        <MyLessons accessToken={session.user.accessToken} />
      </PageSubHeader>
    </div>
  );
};

export default DashboardPage;
