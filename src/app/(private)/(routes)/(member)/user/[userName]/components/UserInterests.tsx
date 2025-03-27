'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { type Interest } from '@prisma/client'
import { useUserInterest } from './useUserInterests'
import { type InterestWithUsers } from '../../../interests/page'
import { Icons } from '@/components/icons'
import { getRandomStyle } from '@/lib/constants'
import InterestModal from '../../../interests/components/interest-modal'
import { cn } from '@/lib/utils'

const UserInterests = ({
  allInterests,
  profileUserId,
  currentUserId
}: {
  allInterests?: Interest[]
  profileUserId: string
  currentUserId: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedInterest, setSelectedInterest] =
    useState<InterestWithUsers | null>(null)

  const {
    addInterest,
    removeInterest,
    interests: newUserInterests,
    isLoadingInterests
  } = useUserInterest(profileUserId)

  const availableInterests = (allInterests || []).filter(
    interest =>
      !newUserInterests?.some(userInterest => userInterest.id === interest?.id)
  )

  const isCurrentUser = profileUserId === currentUserId

  const handleBadgeClick = (interest: InterestWithUsers) => {
    setSelectedInterest(interest)
  }

  const closeModal = () => {
    setSelectedInterest(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">Interests</h3>
        {isCurrentUser && (
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <button
                onClick={() => {
                  setIsOpen(!isOpen)
                }}
                className="flex items-center text-gray-500 hover:text-gray-700"
              >
                <Icons.arrowDown className="ml-1 w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-h-64 overflow-y-auto w-full flex flex-col gap-2">
              {availableInterests.map(interest => {
                return (
                  <DropdownMenuItem
                    className="cursor-pointer"
                    key={interest.id}
                    onClick={async () => {
                      await addInterest(interest.id)
                      setIsOpen(false)
                    }}
                  >
                    {interest.interest}
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        {newUserInterests.length ? (
          newUserInterests.map(interest => (
            <Badge
              key={interest.id}
              className={cn(
                'text-white gap-x-2 cursor-pointer',
                getRandomStyle()
              )}
              onClick={() => {
                handleBadgeClick(interest)
              }}
            >
              {interest.interest}
              {isCurrentUser && (
                <Icons.close
                  size={10}
                  className="cursor-pointer"
                  onClick={async e => {
                    e.stopPropagation()
                    await removeInterest(interest.id)
                  }}
                />
              )}
            </Badge>
          ))
        ) : (
          <p
            onClick={() => {
              if (isCurrentUser) setIsOpen(true)
            }}
            className={`cursor-pointer flex gap-x-2 ${
              isCurrentUser ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            <span>
              {isLoadingInterests ? (
                <Icons.loader className="animate-spin h-6 w-6" />
              ) : isCurrentUser ? (
                'No interests, click to add'
              ) : (
                'No interests available'
              )}
            </span>
            {isCurrentUser && <Icons.plusCircle />}
          </p>
        )}
      </div>
      {selectedInterest && (
        <InterestModal
          userId={profileUserId}
          interest={selectedInterest}
          onClose={closeModal}
        />
      )}
    </div>
  )
}

export default UserInterests
