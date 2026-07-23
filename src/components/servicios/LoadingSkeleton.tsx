import { Skeleton } from "@/components/ui/skeleton";

/** Grid de placeholders con animación pulse mientras carga el catálogo. */
export function LoadingSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm"
        >
          <Skeleton className="h-48 w-full rounded-none" />
          <div className="flex flex-1 flex-col gap-3 p-5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="mt-auto flex items-center justify-between pt-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-9 w-28 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
