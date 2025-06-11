'use client'

import { useState } from 'react'
import {
  type AwardResource,
  type PositionMultiplier,
  Positions
} from '@prisma/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import { Icons } from '../icons'

interface PointSystemInfoCardProps {
  awardResources: AwardResource[]
  positionMultipliers: PositionMultiplier[]
}

// Helper to format enum keys (e.g., FORUM_POST_LIKE -> Forum Post Like)
const formatEnumKey = (key: string) => {
  return key
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const positionOrder: Positions[] = [
  Positions.ADMIN,
  Positions.AMBASSADOR,
  Positions.BUILDER,
  Positions.PSP,
  Positions.BASE
]

export const PointSystemInfoCard = ({
  awardResources,
  positionMultipliers
}: PointSystemInfoCardProps) => {
  const [isOpen, setIsOpen] = useState(false)

  if (!awardResources.length && !positionMultipliers.length) {
    return null
  }

  const sortedPositionMultipliers = [...positionMultipliers].sort((a, b) => {
    return positionOrder.indexOf(a.position) - positionOrder.indexOf(b.position)
  })

  const content = (
    <CardContent className="px-6 pt-4 space-y-6">
      <div>
        <h4 className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
          How it Works
        </h4>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Earn points by engaging with the community and contributing to
          projects. Your total points determine your rank on the leaderboard for
          the current season.
        </p>
      </div>

      {awardResources.length > 0 && (
        <div>
          <Separator className="my-4" />
          <h4 className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
            Base Scores
          </h4>
          <ul className="space-y-2">
            {awardResources.map(resource => (
              <li
                key={resource.id}
                className="flex flex-wrap justify-between items-center text-xs sm:text-sm gap-2"
              >
                <span className="text-muted-foreground">
                  {formatEnumKey(resource.resource)}:
                </span>
                <span className="font-semibold text-green-600 dark:text-green-400 shrink-0">
                  {resource.baseScore} pts
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {sortedPositionMultipliers.length > 0 && (
        <div>
          <Separator className="my-4" />
          <h4 className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
            Position Multipliers
          </h4>
          <p className="text-xs sm:text-sm text-muted-foreground mb-3">
            Your current position can grant you a multiplier on earned points:
          </p>
          <ul className="space-y-2">
            {sortedPositionMultipliers
              .filter(pm => pm.position !== Positions.ADMIN)
              .map(pm => (
                <li
                  key={pm.id}
                  className="flex justify-between items-center text-xs sm:text-sm"
                >
                  <span className="text-muted-foreground">
                    {formatEnumKey(pm.position)}
                  </span>
                  <span
                    className={cn('font-semibold', {
                      'text-blue-500': pm.multiplier > 1,
                      'text-gray-500 dark:text-gray-400': pm.multiplier === 1
                    })}
                  >
                    x{pm.multiplier.toFixed(1)}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      )}
      <Separator className="my-4" />
      <div>
        <p className="text-xs text-muted-foreground/80 mt-4 italic">
          Note: Points and multipliers are specific to the current season and
          may change in future seasons.
        </p>
      </div>
    </CardContent>
  )

  return (
    <Card>
      <div className="hidden lg:block">
        <CardHeader className="px-6 pb-4">
          <CardTitle className="text-gray-900 dark:text-muted-foreground text-lg sm:text-xl font-semibold">
            Point System
          </CardTitle>
        </CardHeader>
        {content}
      </div>

      <div className="lg:hidden">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CardHeader className="px-6 pb-4">
            <div className="flex items-center justify-between">
              <CollapsibleTrigger asChild className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-900 dark:text-muted-foreground text-lg sm:text-xl font-semibold select-none pointer-events-none">
                    Point System
                  </CardTitle>
                  <Icons.arrowDown
                    className={cn(
                      'h-4 w-4 transition-transform duration-200 text-muted-foreground',
                      isOpen ? 'rotate-180' : ''
                    )}
                  />
                </div>
              </CollapsibleTrigger>
            </div>
          </CardHeader>
          <CollapsibleContent>{content}</CollapsibleContent>
        </Collapsible>
      </div>
    </Card>
  )
}
