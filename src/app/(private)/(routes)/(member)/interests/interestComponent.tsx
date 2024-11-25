'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { type Interest, type User } from '@prisma/client'
import { toast } from '@/components/ui/use-toast'
import { type InterestWithUsers } from './page'

interface InterestsComponentProps {
  interests: InterestWithUsers[]
  userId: string
}

const InterestsComponent: React.FC<InterestsComponentProps> = ({
  interests,
  userId
}) => {
  const [selectedInterest, setSelectedInterest] =
    React.useState<Interest | null>(null)
  const [users, setUsers] = React.useState<User[]>([])
  const [showModal, setShowModal] = React.useState(false)

  const handleInterestClick = (interest: InterestWithUsers) => {
    setSelectedInterest(interest)
    setUsers(interest.users)
    setShowModal(true)
  }

  const addInterest = async (interestId: string) => {
    try {
      await api.post(`/api/interest/${interestId}/${userId}`)
      toast({ title: 'Interest added successfully!' })
    } catch (error) {
      console.error('Failed to add interest:', error)
      toast({ title: 'Failed to add interest.' })
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedInterest(null)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Explore Interests</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {interests.map((interest, index) => (
          <Badge
            key={index}
            onClick={() => {
              handleInterestClick(interest)
            }}
            className="hover:cursor-pointer px-4 py-2 text-center rounded-lg bg-gray-300"
          >
            {interest.interest}
          </Badge>
        ))}
      </div>

      {showModal && selectedInterest && (
        <Modal
          isOpen={showModal}
          onClose={closeModal}
          title={`Users interested in "${selectedInterest.interest}"`}
          description=""
        >
          {users.length > 0 ? (
            <ul className="space-y-2">
              {users.map((user, index) => (
                <li key={index} className="px-4 py-2 rounded-lg shadow-sm">
                  {user.username}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No users found for this interest.</p>
          )}
          <div className="flex justify-end space-x-4 mt-4">
            <Button onClick={closeModal} className="text-black">
              Close
            </Button>
            <Button
              variant="outline"
              onClick={async () => {
                if (!selectedInterest) return
                await addInterest(selectedInterest.id)
              }}
            >
              Add to your interests
            </Button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default InterestsComponent
