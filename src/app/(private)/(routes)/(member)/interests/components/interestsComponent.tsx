'use client'

import React from 'react'
import { type InterestWithUsers } from '../page'
import InterestModal from './InterestModal'
import { badgeStyles } from '@/lib/constants'

interface InterestsComponentProps {
  interests: InterestWithUsers[]
  userId: string
}

const InterestsComponent: React.FC<InterestsComponentProps> = ({
  interests,
  userId
}) => {
  const [selectedInterest, setSelectedInterest] =
    React.useState<InterestWithUsers | null>(null)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Explore Interests</h2>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {interests.map((interest, index) => {
          const randomStyle =
            badgeStyles[Math.floor(Math.random() * badgeStyles.length)]
          return (
            <p
              key={index}
              onClick={() => {
                setSelectedInterest(interest)
              }}
              className={`${randomStyle} hover:cursor-pointer px-4 py-2 text-center justify-between`}
            >
              {interest.interest} <span>{interest.users.length}</span>
            </p>
          )
        })}
      </div>
      {selectedInterest && (
        <InterestModal
          interest={selectedInterest}
          userId={userId}
          onClose={() => {
            setSelectedInterest(null)
          }}
        />
      )}
    </div>
  )
}

export default InterestsComponent
