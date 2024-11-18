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
import { ChevronDown, PlusCircle, XIcon } from 'lucide-react'
import { useInterest } from './useUserInterests'

const UserInterests = ({
  userInterests,
  allInterests,
  userId
}: {
  userInterests: Interest[]
  allInterests?: Interest[]
  userId: string
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const {
    addInterest,
    removeInterest,
    interests: newUserInterests
  } = useInterest(userId)

  const availableInterests = (allInterests || []).filter(
    interest =>
      !newUserInterests?.some(userInterest => userInterest.id === interest?.id)
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">Interests</h3>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <button
              onClick={() => {
                setIsOpen(!isOpen)
              }}
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <ChevronDown className="ml-1 w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-h-64 overflow-y-auto">
            {availableInterests.map(interest => (
              <DropdownMenuItem
                key={interest.id}
                onClick={async () => {
                  await addInterest(interest.id)
                  setIsOpen(false)
                }}
              >
                {interest.interest}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-wrap gap-3">
        {newUserInterests.length ? (
          newUserInterests.map(interest => (
            <Badge
              key={interest.id}
              className="bg-slate-800 text-white gap-x-2"
            >
              {interest.interest}
              <XIcon
                size={10}
                className="cursor-pointer"
                onClick={async () => {
                  await removeInterest(interest.id)
                }}
              />
            </Badge>
          ))
        ) : (
          <p
            onClick={() => {
              setIsOpen(true)
            }}
            className="cursor-pointer flex gap-x-2 "
          >
            <span>No interests, click to add</span>
            <PlusCircle />
          </p>
        )}
      </div>
    </div>
  )
}

export default UserInterests
