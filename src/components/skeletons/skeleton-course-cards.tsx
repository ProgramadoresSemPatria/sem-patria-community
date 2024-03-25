import { Skeleton } from '@/components/ui/skeleton'
import { v4 as uuid } from 'uuid'

export const SkeletonCourseCards = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-6 p-4">
        {Array.from({ length: 3 }).map(row => (
          <Skeleton key={uuid()} className="w-full h-44 rounded-md" />
        ))}
      </div>
    </>
  )
}
