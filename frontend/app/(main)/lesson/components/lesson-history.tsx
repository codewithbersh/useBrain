import { MyHistory } from "@/types";

import { DataTable } from "@/components/data-table";
import { PageSubHeader } from "@/components/page-subheader";
import { columns } from "./columns";

interface LessonHistoryProps {
  history: MyHistory[];
}
const LessonHistory = ({ history }: LessonHistoryProps) => {
  return (
    <div className="space-y-6">
      <PageSubHeader heading="History" description="View lesson history" />
      <div className="">
        <DataTable columns={columns} data={history} />
      </div>
    </div>
  );
};

export { LessonHistory };
