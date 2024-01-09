import { Skeleton } from '@/components/ui/skeleton'
import { v4 as uuid } from 'uuid'

export const SkeletonNoteList = () => {
  return (
    <>
      {Array.from({ length: 4 }).map(row => (
        <Skeleton key={uuid()} className="w-[95%] my-2 h-20 rounded-sm " />
      ))}
    </>
  )
}
