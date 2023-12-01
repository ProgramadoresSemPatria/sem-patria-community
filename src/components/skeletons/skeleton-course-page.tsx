import { Skeleton } from '@/components/ui/skeleton'
import { v4 as uuid } from 'uuid'
import { SkeletonCourseCards } from './skeleton-course-cards'

export const SkeletonCoursePage = () => {
  return (
    <div className="flex flex-col gap-y-4 mt-8">
      <Skeleton className="h-6 w-56" />
      <div className="flex items-center gap-x-3">
        {Array.from({ length: 6 }).map(() => (
          <Skeleton key={uuid()} className="h-6 w-20" />
        ))}
      </div>
      <div className="flex  flex-wrap">
        <SkeletonCourseCards />
      </div>
    </div>
  )
}
