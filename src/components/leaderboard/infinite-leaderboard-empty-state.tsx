'use client'

import { Icons } from '@/components/icons'

export const InfiniteLeaderboardEmptyState = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-8 mt-2 rounded-lg px-4">
      <Icons.trophy className="w-16 h-16 text-muted-foreground" />
      <h3 className="text-lg font-medium text-muted-foreground mt-4 text-center">
        Legends are being made! Will you be next?
      </h3>
      <p className="text-sm text-muted-foreground/70 mt-1 max-w-md text-center">
        Earn points through community engagement and contributions to rank on
        this season&apos;s leaderboard.
      </p>
      <div className="mt-8 grid grid-cols-3 gap-4 opacity-30">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-20 h-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
          />
        ))}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-16 h-1 rounded-full bg-gradient-to-r from-blue-400/60 to-purple-500/60"
          />
        ))}
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="w-12 h-1 rounded-full bg-gradient-to-r from-blue-400/40 to-purple-500/40"
          />
        ))}
      </div>
    </div>
  )
}
