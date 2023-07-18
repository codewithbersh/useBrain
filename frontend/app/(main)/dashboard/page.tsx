import { MyLessons } from "@/components/my-lessons";
import { PageHeader } from "@/components/page-header";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <PageHeader
        heading="Dashboard"
        description="View and manage your dashboard."
      />

      <div className="space-y-6">
        <h1 className="font-bold leading-none">My lessons</h1>

        {session && <MyLessons accessToken={session.user.accessToken} />}
      </div>
    </div>
  );
};

export default DashboardPage;
