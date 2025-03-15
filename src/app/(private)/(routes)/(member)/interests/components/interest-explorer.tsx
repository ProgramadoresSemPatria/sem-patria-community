'use client'

import { type FC, useEffect, useState } from 'react'
import { type InterestWithUsers } from '../page'
import InterestItem from './interest-item'
import InterestModal from './interest-modal'
import { useRouter, useSearchParams } from 'next/navigation'

interface InterestExplorerProps {
  interests: InterestWithUsers[]
  userId: string
}

const InterestExplorer: FC<InterestExplorerProps> = ({ interests, userId }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedInterest, setSelectedInterest] =
    useState<InterestWithUsers | null>(null)

  useEffect(() => {
    const interestId = searchParams.get('interestId')

    if (interestId) {
      const foundInterest = interests.find(i => i.id === interestId)
      if (foundInterest) {
        setSelectedInterest(foundInterest)
        router.replace(`/interests`)
      }
    }
  }, [searchParams, interests, router])

  const handleInterestClick = (interest: InterestWithUsers) => {
    setSelectedInterest(interest)
  }

  return (
    <div className="space-y-6">
      <p className="text-left text-muted-foreground">
        Discover and explore interests, connect with others who share your
        interests, and collaborate with those who appreciate the same things.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
