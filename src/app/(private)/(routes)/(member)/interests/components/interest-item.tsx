'use client'

import { type FC } from 'react'
import { type InterestWithUsers } from '../page'
import { getRandomStyle } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'

interface InterestItemProps {
  interest: InterestWithUsers
  onClick: () => void
}

const InterestItem: FC<InterestItemProps> = ({ interest, onClick }) => {
  const randomStyle = getRandomStyle()

  const capitalizeInterest = (interest: string) => {
    return interest
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const memberText = interest.users.length === 1 ? 'Member' : 'Members'

  return (
    <Card
      className="col-span-1 flex rounded-md shadow-sm cursor-pointer"
      onClick={onClick}
    >
      <div
        className={cn(
          'flex w-16 shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white',
          randomStyle
        )}
      >
        {interest.interest
          .split(' ')
          .map(word => word[0])
          .join('')
          .toUpperCase()}
      </div>
      <CardContent className="p-2 flex flex-1 items-center justify-between truncate rounded-r-md">
        <div className="flex-1 truncate px-4 py-2 text-sm">
          <button className="font-medium text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-300">
            {capitalizeInterest(interest.interest)}
          </button>
          <p className="text-gray-500 dark:text-gray-400">
            {interest.users.length} {memberText}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default InterestItem
