'use client'

import React from 'react'
import { type InterestWithUsers } from '../page'
import InterestModal from './InterestModal'

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

  const badgeStyles = [
    'inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20',
    'inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20',
    'inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-400/20',
    'inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20',
    'inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/30',
    'inline-flex items-center rounded-md bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/30',
    'inline-flex items-center rounded-md bg-purple-400/10 px-2 py-1 text-xs font-medium text-purple-400 ring-1 ring-inset ring-purple-400/30',
    'inline-flex items-center rounded-md bg-pink-400/10 px-2 py-1 text-xs font-medium text-pink-400 ring-1 ring-inset ring-pink-400/20'
  ]

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
