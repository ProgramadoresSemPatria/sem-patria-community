'use client'

import { type InterestWithUsers } from '../page'
import InterestExplorer from './interest-explorer'
import { useAllInterests } from '../hooks/use-all-interests'
import { Skeleton } from '@/components/ui/skeleton'

interface InterestExplorerClientProps {
  userId: string
  initialInterests: InterestWithUsers[]
}

const InterestExplorerClient = ({
  userId,
  initialInterests
}: InterestExplorerClientProps) => {
  const { interests, isLoading } = useAllInterests(initialInterests)

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    )
  }

  return <InterestExplorer userId={userId} interests={interests} />
}

export default InterestExplorerClient
