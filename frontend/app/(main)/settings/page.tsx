import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { PageHeader } from "@/components/page-header";
import { ManageAccountSettings } from "@/components/manage-account-settings";
import { getUserInfo } from "@/lib/user";

export const revalidate = 0;

const SettingsPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  const user = await getUserInfo(session.user.accessToken);
  return (
    <div className="space-y-8">
      <PageHeader
        heading="Settings"
        description="Manage your account settings"
      />

      <ManageAccountSettings session={session} initialData={user} />
    </div>
  );
};

export default SettingsPage;
