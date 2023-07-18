import Link from "next/link";

import { PageHeader } from "@/components/page-header";

const DashboardPage = () => {
  return (
    <div>
      <PageHeader
        heading="Dashboard"
        description="View and manage your dashboard."
      />
      <Link href="http://localhost:3000/lesson?id=72c332ed-34c2-49f1-b9b6-cce1f9eb5a1f">
        private
      </Link>
      <Link href="http://localhost:3000/lesson?id=95038a3d-ee09-49b6-bf7e-79169b83d643">
        public
      </Link>
    </div>
  );
};

export default DashboardPage;
