import { cn } from '@/lib/utils';

interface SkeletonLoaderProps {
  className?: string;
  count?: number;
}

export function SkeletonLoader({ className, count = 1 }: SkeletonLoaderProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={cn('rounded-lg shimmer h-4', className)} />
      ))}
    </>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-lg glass p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full shimmer" />
        <div className="space-y-2 flex-1">
          <div className="h-4 w-3/4 shimmer rounded" />
          <div className="h-3 w-1/2 shimmer rounded" />
        </div>
      </div>
      <div className="h-3 w-full shimmer rounded" />
      <div className="h-3 w-2/3 shimmer rounded" />
      <div className="flex gap-2">
        <div className="h-6 w-16 shimmer rounded-full" />
        <div className="h-6 w-20 shimmer rounded-full" />
      </div>
    </div>
  );
}
