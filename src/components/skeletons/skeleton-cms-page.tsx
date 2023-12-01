import { Skeleton } from '@/components/ui/skeleton'

export const SkeletonCmsPage = () => {
  return (
    <div className="flex flex-col gap-y-4 pt-6">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-6 w-80" />
      <Skeleton className="h-8 w-80 mt-8" />
      <Skeleton className="h-96 w-full mt-6" />
    </div>
  )
}
