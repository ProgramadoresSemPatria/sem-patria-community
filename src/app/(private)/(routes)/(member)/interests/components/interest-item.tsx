'use client'

import { type FC } from 'react'
import { type InterestWithUsers } from '../page'
import { Card, CardContent } from '@/components/ui/card'

interface InterestItemProps {
  interest: InterestWithUsers
  onClick: () => void
}

const InterestItem: FC<InterestItemProps> = ({ interest, onClick }) => {
  const capitalizeInterest = (interest: string) => {
    return interest
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const memberText = interest.users.length === 1 ? 'Member' : 'Members'

  return (
    <Card
      onClick={onClick}
      className="p-2 flex cursor-pointer w-full hover:bg-sidebar-accent hover:text-secondary"
    >
      <CardContent className="p-2 flex flex-col items-center truncate">
        <div>
          <h2 className="font-bold text-lg">
            {capitalizeInterest(interest.interest)}
          </h2>
          <p className="text-xs">
            {interest.users.length} {memberText}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default InterestItem
