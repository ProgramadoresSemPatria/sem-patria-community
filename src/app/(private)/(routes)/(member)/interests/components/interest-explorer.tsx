'use client'

import { type FC, useState } from 'react'
import { type InterestWithUsers } from '../page'
import InterestItem from './interest-item'
import InterestModal from './interest-modal'

interface InterestExplorerProps {
  interests: InterestWithUsers[]
  userId: string
}

const InterestExplorer: FC<InterestExplorerProps> = ({ interests, userId }) => {
  const [selectedInterest, setSelectedInterest] =
    useState<InterestWithUsers | null>(null)

  const handleInterestClick = (interest: InterestWithUsers) => {
    setSelectedInterest(interest)
  }

  return (
    <div className="space-y-6">
      <p className="text-justify text-gray-600">
        Discover and explore a variety of interests within the community. See
        what others are passionate about and connect with members who share
        similar interests. Click on an interest to learn more and find people
        who are also involved, helping you build connections and collaborate
        with like-minded individuals.
      </p>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {interests.map((interest, index) => (
          <InterestItem
            key={index}
            interest={interest}
            onClick={() => {
              handleInterestClick(interest)
            }}
          />
        ))}
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

export default InterestExplorer
