import { Skeleton } from '@/components/ui/skeleton'
import { v4 as uuid } from 'uuid'

type SkeletonDefaultProps = {
  length?: number
}

export const SkeletonDefault = ({ length = 3 }: SkeletonDefaultProps) => {
  return (
    <>
      {Array.from({ length }).map(() => (
        <Skeleton key={uuid()} className="w-full h-5 rounded my-4" />
      ))}
    </>
  )
}
