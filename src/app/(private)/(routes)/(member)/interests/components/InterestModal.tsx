'use client'

import React, { useEffect, useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { type InterestWithUsers } from '../page'
import { type User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useUserInterest } from '../../user/[userName]/components/useUserInterests'

interface InterestModalProps {
  interest: InterestWithUsers
  userId: string
  onClose: () => void
}

const InterestModal = ({ interest, userId, onClose }: InterestModalProps) => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const {
    addInterest,
    interests,
    removeInterest,
    isAddingInterest,
    isRemovingInterest
  } = useUserInterest(userId)
  useEffect(() => {}, [addInterest, removeInterest])

  const hasInterest = interests?.some(
    userInterest => userInterest.interest === interest.interest
  )

  const groupedUsers = interest.users.reduce(
    (acc: Record<string, User[]>, user) => {
      const firstLetter = user.name.charAt(0).toUpperCase()
      if (!acc[firstLetter]) acc[firstLetter] = []
      acc[firstLetter].push(user)
      return acc
    },
    {}
  )

  const filteredUsers = searchQuery
    ? Object.keys(groupedUsers).reduce(
        (acc: Record<string, User[]>, letter) => {
          const filtered = groupedUsers[letter].filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          if (filtered.length > 0) acc[letter] = filtered
          return acc
        },
        {}
      )
    : groupedUsers

  const handleInterestAction = async () => {
    try {
      if (hasInterest) {
        await removeInterest(interest.id)
      } else {
        await addInterest(interest.id)
      }
    } catch (error) {
      console.error('Failed to update interest:', error)
    }
  }

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={`Users Interested in "${interest.interest}"`}
      description=""
      className="overflow-y-auto max-h-[800px]"
    >
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none"
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value)
          }}
        />
      </div>

      {Object.keys(filteredUsers).length > 0 ? (
        <nav aria-label="Directory">
          {Object.keys(filteredUsers).map(letter => (
            <div key={letter} className="relative">
              <div className="sticky top-0 z-10 bg-card px-3 py-1 text-sm font-semibold">
                {letter}
              </div>
              <ul role="list" className="divide-y divide-gray-100">
                {filteredUsers[letter].map(person => (
                  <li
                    key={person.email}
                    className="flex items-center gap-x-4 px-3 py-2 cursor-pointer hover:bg-accent/20"
                    onClick={() => {
                      router.push(`/user/${person.username}`)
                    }}
                  >
                    <img
                      alt={person.name}
                      src={person.imageUrl || '/default-avatar.png'}
                      className="h-8 w-8 flex-none rounded-full bg-gray-50"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white">
                        {person.name}
                      </p>
                      <p className="text-xs text-gray-400">{person.email}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      ) : (
        <p className="text-gray-500 text-center mt-4">
          No users found for this interest.
        </p>
      )}

      <div className="flex justify-end space-x-4 mt-6">
        <Button
          onClick={onClose}
          disabled={isAddingInterest || isRemovingInterest}
        >
          Close
        </Button>
        <Button
          variant="destructive"
          onClick={handleInterestAction}
          disabled={isAddingInterest || isRemovingInterest}
        >
          {isAddingInterest || isRemovingInterest
            ? 'Processing...'
            : hasInterest
              ? 'Remove Interest'
              : 'Add to Interests'}
        </Button>
      </div>
    </Modal>
  )
}

export default InterestModal
