'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { type User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState, type FC } from 'react'
import { useUserInterest } from '../../user/[userName]/components/useUserInterests'
import { type InterestWithUsers } from '../page'

interface InterestModalProps {
  interest: InterestWithUsers
  userId: string
  onClose: () => void
}

const InterestModal: FC<InterestModalProps> = ({
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
      interest.users.reduce((acc: Record<string, User[]>, item) => {
        const firstLetter = item.user.name.charAt(0).toUpperCase()
        if (!acc[firstLetter]) acc[firstLetter] = []
        acc[firstLetter].push(item.user)
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
            <div className="top-0 bg-card px-3 py-1 text-sm font-semibold">
              {letter}
            </div>
            <ul role="list" className="divide-y">
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
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="flex flex-col gap-0 p-0 max-w-sm sm:max-w-xl sm:max-h-[min(640px,80vh)]">
        <div className="flex flex-col h-full">
          <DialogHeader className="sticky top-0">
            <DialogTitle className="border-b border-border px-6 py-4 text-base">
              Users Interested in &quot;{interest.interest}&quot;
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto">
            <DialogDescription asChild>
              <div className="px-6 py-4 text-left">
                <SearchInput value={searchQuery} onChange={setSearchQuery} />
                <div className="overflow-y-auto max-h-[30vh]">
                  {renderUserList()}
                </div>
              </div>
            </DialogDescription>
          </div>
          <DialogFooter className="bottom-0 border-t border-border px-6 py-4 gap-y-4">
            <DialogClose asChild>
              <Button type="button" onClick={onClose} variant="outline">
                Close
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant={hasInterest ? 'destructive' : 'default'}
              onClick={handleInterestAction}
              disabled={isAddingInterest || isRemovingInterest}
            >
              {isAddingInterest || isRemovingInterest
                ? 'Processing...'
                : hasInterest
                  ? 'Remove Interest'
                  : 'Add to Interests'}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const SearchInput: FC<{
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

const UserListItem: FC<{
  person: User
  onClick: (username: string) => void
}> = ({ person, onClick }) => (
  <li
    className="flex items-center gap-x-4 px-3 py-2 cursor-pointer hover:bg-accent/20"
    onClick={() => {
      onClick(person.username)
    }}
  >
    <Avatar>
      <AvatarImage alt={person.name} src={person.imageUrl ?? ''} />
      <AvatarFallback>{person.name.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
    <div className="min-w-0">
      <p className="text-sm font-medium dark:text-white">{person.name}</p>
      <p className="text-xs text-gray-400">{person.email}</p>
    </div>
  </li>
)

export default InterestModal
