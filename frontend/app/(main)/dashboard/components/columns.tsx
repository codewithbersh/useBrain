"use client";

import { MyHistory } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useRouter } from "next/navigation";

import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<MyHistory>[] = [
  {
    accessorKey: "date_played",
    cell: ({ row }) => {
      return moment(row.getValue("date_played")).format("ll");
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "lesson.title",
    header: "Lesson",
    cell: ({ row }) => {
      return (
        <div className="line-clamp-2 min-w-[150px]">
          {row.original.lesson.title}
        </div>
      );
    },
  },
  {
    accessorKey: "total_correct_answers",
    cell: ({ row }) => {
      return (
        <div className="">
          {row.original.total_correct_answers} out of{" "}
          {row.original.total_questions}
        </div>
      );
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Score
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    header: "Percentage",
    cell: ({ row }) => {
      return (
        <div className="font-bold">
          {(row.original.total_correct_answers / row.original.total_questions) *
            100}
          %
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onSelect={() => router.push(`/play?id=${row.original.lesson.id}`)}
            >
              Play again
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() =>
                router.push(`/lesson?id=${row.original.lesson.id}`)
              }
            >
              View lesson
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
