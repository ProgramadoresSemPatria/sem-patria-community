import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import { v4 as uuid } from 'uuid'

export const SkeletonMembersList = () => {
  return (
    <div className="mt-6 w-full max-w-3xl flex flex-col gap-y-6">
      {Array.from({ length: 3 }).map(() => (
        <div
          key={uuid()}
          className="flex items-center justify-between space-x-4"
        >
          <div className="flex items-center space-x-4">
            <Skeleton className="w-10 h-10 rounded-full" />

            <div className="flex flex-col gap-y-1">
              <Skeleton className="w-20 h-3 rounded-md" />
              <Skeleton className="w-10 h-3 rounded-md" />
            </div>
          </div>
          <div className="ml-auto flex items-center gap-x-4">
            <Skeleton className="w-12 h-4 rounded-sm" />
            <Skeleton className="w-16 h-6 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  )
}
