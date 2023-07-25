"use client";

import { MyHistory } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    accessorKey: "player.email",
    header: "Player",
    cell: ({ row }) => {
      const { nickname, first_name, last_name, email } = row.original.player;
      const displayName = nickname ? nickname : first_name ? first_name : email;
      return <div>{displayName}</div>;
    },
  },
];
