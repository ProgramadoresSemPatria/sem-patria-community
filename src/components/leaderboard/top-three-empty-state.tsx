'use client'

import { Icons } from '@/components/icons'

export const TopThreeEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-4 text-center">
      <Icons.trophy className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium text-muted-foreground">
        Nobody scored yet
      </h3>
      <p className="text-sm text-muted-foreground/70 mt-1">
        Be the first to join the leaderboard
      </p>
    </div>
  )
}

export default TopThreeEmptyState
