"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyHistory } from "@/lib/history";
import { MyHistory } from "@/types";

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
interface MyHistoryProps {
  initialData: MyHistory[] | null;
  accessToken: string;
}

const MyHistory = ({ initialData, accessToken }: MyHistoryProps) => {
  const { data: history } = useQuery({
    queryKey: ["my-history"],
    queryFn: () => getMyHistory(accessToken),
    initialData: initialData,
  });
  if (!history) return null;
  return (
    <div className="">
      <DataTable data={history} columns={columns} />
    </div>
  );
};

export { MyHistory };
