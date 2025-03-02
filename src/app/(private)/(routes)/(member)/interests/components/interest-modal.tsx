'use client'

import { useState, useCallback, useMemo } from 'react'
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

const InterestModal: React.FC<InterestModalProps> = ({
  interest,
  userId,
  onClose
}) => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const {
    addInterest,
    interests,
    removeInterest,
    isAddingInterest,
    isRemovingInterest
  } = useUserInterest(userId)

  const hasInterest = useMemo(
    () =>
      interests?.some(
        userInterest => userInterest.interest === interest.interest
      ),
    [interests, interest]
  )

  const groupedUsers = useMemo(
    () =>
      interest.users.reduce((acc: Record<string, User[]>, user) => {
        const firstLetter = user.name.charAt(0).toUpperCase()
        if (!acc[firstLetter]) acc[firstLetter] = []
        acc[firstLetter].push(user)
        return acc
      }, {}),
    [interest.users]
  )

  const filteredUsers = useMemo(() => {
    if (!searchQuery) return groupedUsers
    return Object.keys(groupedUsers).reduce(
      (acc: Record<string, User[]>, letter) => {
        const filtered = groupedUsers[letter].filter(user =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        if (filtered.length > 0) acc[letter] = filtered
        return acc
      },
      {}
    )
  }, [groupedUsers, searchQuery])

  const handleInterestAction = useCallback(async () => {
    try {
      if (hasInterest) {
        await removeInterest(interest.id)
        return
      }
      await addInterest(interest.id)
    } catch (error) {
      console.error('Failed to update interest:', error)
    }
  }, [hasInterest, removeInterest, addInterest, interest.id])

  const handleUserClick = useCallback(
    (username: string) => {
      router.push(`/user/${username}`)
    },
    [router]
  )

  const renderUserList = () => {
    if (Object.keys(filteredUsers).length === 0) {
      return (
        <p className="text-gray-500 text-center mt-4">
          No users found for this interest.
        </p>
      )
    }

    return (
      <nav aria-label="Directory">
        {Object.entries(filteredUsers).map(([letter, users]) => (
          <div key={letter} className="relative">
            <div className="sticky top-0 z-10 bg-card px-3 py-1 text-sm font-semibold">
              {letter}
            </div>
            <ul role="list" className="divide-y divide-gray-100">
              {users.map(person => (
                <UserListItem
                  key={person.email}
                  person={person}
                  onClick={handleUserClick}
                />
              ))}
            </ul>
          </div>
        ))}
      </nav>
    )
  }

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={`Users Interested in "${interest.interest}"`}
      description=""
      className="overflow-y-auto max-h-[90vh] w-full max-w-sm md:max-w-lg mx-auto"
    >
      <div className="flex flex-col h-full">
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
        <div className="flex-grow overflow-y-auto">{renderUserList()}</div>
        <ModalActions
          onClose={onClose}
          onAction={handleInterestAction}
          isLoading={isAddingInterest || isRemovingInterest}
          hasInterest={hasInterest}
        />
      </div>
    </Modal>
  )
}

const SearchInput: React.FC<{
  value: string
  onChange: (value: string) => void
}> = ({ value, onChange }) => (
  <div className="mb-4">
    <input
      type="text"
      placeholder="Search users..."
      className="w-full px-4 py-2 border rounded-md focus:outline-none"
      value={value}
      onChange={e => {
        onChange(e.target.value)
      }}
    />
  </div>
)

const UserListItem: React.FC<{
  person: User
  onClick: (username: string) => void
}> = ({ person, onClick }) => (
  <li
    className="flex items-center gap-x-4 px-3 py-2 cursor-pointer hover:bg-accent/20"
    onClick={() => {
      onClick(person.username)
    }}
  >
    <img
      alt={person.name}
      src={person.imageUrl || '/default-avatar.png'}
      className="h-8 w-8 flex-none rounded-full bg-gray-50"
    />
    <div className="min-w-0">
      <p className="text-sm font-medium dark:text-white">{person.name}</p>
      <p className="text-xs text-gray-400">{person.email}</p>
    </div>
  </li>
)

const ModalActions: React.FC<{
  onClose: () => void
  onAction: () => void
  isLoading: boolean
  hasInterest: boolean
}> = ({ onClose, onAction, isLoading, hasInterest }) => (
  <div className="flex justify-end space-x-4 mt-6 sticky bottom-0 bg-background p-4 border-t">
    <Button onClick={onClose} disabled={isLoading} className="w-full sm:w-auto">
      Close
    </Button>
    <Button
      variant="destructive"
      onClick={onAction}
      disabled={isLoading}
      className="w-full sm:w-auto"
    >
      {isLoading
        ? 'Processing...'
        : hasInterest
          ? 'Remove Interest'
          : 'Add to Interests'}
    </Button>
  </div>
)

export default InterestModal
