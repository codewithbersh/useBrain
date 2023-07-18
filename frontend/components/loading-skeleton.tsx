import { Skeleton } from "@/components/ui/skeleton";

const LoadingLessonSummary = () => {
  return (
    <div className="space-y-2">
      <Skeleton className="h-14 w-full min-[585px]:h-7 md:h-14 min-[827px]:h-7" />
      <Skeleton className="h-[22px] w-[120px]" />
    </div>
  );
};

export { LoadingLessonSummary };
