'use client'

import { type FC } from 'react'
import { type InterestWithUsers } from '../page'
import { getRandomStyle } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface InterestItemProps {
  interest: InterestWithUsers
  onClick: () => void
}

const InterestItem: FC<InterestItemProps> = ({ interest, onClick }) => (
  <p
    onClick={onClick}
    className={cn(
      'hover:cursor-pointer px-4 py-2 text-center justify-between',
      getRandomStyle()
    )}
  >
    {interest.interest} <span>{interest.users.length}</span>
  </p>
)

export default InterestItem
