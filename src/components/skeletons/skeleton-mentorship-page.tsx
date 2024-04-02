import { Skeleton } from '@/components/ui/skeleton'
import { v4 as uuid } from 'uuid'

export const SkeletonMentorshipPage = () => {
  return (
    <>
      <div className="flex flex-col gap-y-6">
        <Skeleton className="w-60 h-6 rounded-md" />
        <div className="grid grid-cols-6 gap-x-4">
          {Array.from({ length: 6 }).map(() => (
            <Skeleton key={uuid()} className="w-[200px] h-[250px] rounded-md" />
          ))}
        </div>
      </div>
    </>
  )
}
