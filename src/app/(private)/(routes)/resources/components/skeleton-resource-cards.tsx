import { Skeleton } from '@/components/ui/skeleton'
import { v4 as uuid } from 'uuid'

export const SkeletonResourceCards = () => {
  return (
    <>
      {Array.from({ length: 8 }).map(row => (
        <div key={uuid()} className="flex flex-col gap-2 p-3 h-full w-64">
          <Skeleton className="w-full h-36 rounded-md" />
          <Skeleton className="w-3/4 h-4 rounded-md" />
          <Skeleton className="w-1/2 h-4 rounded-md" />
          <div className="flex items-center gap-x-2 w-2/5">
            <Skeleton className="h-4 w-6 rounded-full" />
            <Skeleton className="h-4 w-full rounded-md" />
          </div>
          <Skeleton className="w-1/5 h-4 rounded-md" />
        </div>
      ))}
    </>
  )
}
