import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="w-96 md:w-[720px] flex flex-col gap-4">
      <Skeleton className="h-8 w-[150px]" />

      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
    </div>
  );
}
