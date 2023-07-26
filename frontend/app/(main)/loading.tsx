import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-6 md:h-10 w-full max-w-[200px]" />
        <Skeleton className="h-6 md:h-7 w-full max-w-[250px]" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-6 md:h-10 w-full max-w-[200px]" />
        <Skeleton className="h-24  w-full" />
      </div>
    </div>
  );
}
