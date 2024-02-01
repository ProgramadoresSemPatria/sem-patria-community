'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import avatarImg from '@/assets/avatar.png'
import { Icons } from '@/components/icons'
import { AlertModal } from '@/components/modals/alert-modal'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { validateUserLevelColor } from '@/lib/utils'
import { type User } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type MembersListProps = {
  userProps: User
  allUsers: User[]
}

export const MembersList = ({ userProps, allUsers }: MembersListProps) => {
  const router = useRouter()
  const { toast } = useToast()

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)

  const { mutateAsync: deleteUser, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      return await api.delete(`/api/user/${userProps.id}`)
    },
    onSuccess: () => {
      router.refresh()
      toast({
        title: 'Success',
        description: 'User deleted successfully.'
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    }
  })

  const onDeleteUser = async () => {
    try {
      await deleteUser()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    } finally {
      setIsAlertModalOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={isAlertModalOpen}
        description="Are you sure you want to delete this user?"
        loading={isDeleting}
        onClose={() => {
          setIsAlertModalOpen(false)
        }}
        onConfirm={async () => {
          await onDeleteUser()
        }}
      />
      <div className="mt-6  grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 w-full flex-col justify-between gap-y-8 gap-x-12">
        {allUsers.map(user => (
          <div
            key={user.id}
            className="flex items-center justify-between space-x-4"
          >
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={`https://github.com/${user.username}.png`} />
                <AvatarFallback>
                  <Image
                    src={avatarImg.src}
                    alt="avatar"
                    width={40}
                    height={40}
                  />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-sm text-muted-foreground">
                  @{user.username}
                </p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-x-4">
              <Badge
                className={`text-gray-200 ${validateUserLevelColor(
                  user.level ?? 'unknown'
                )}  transition-colors ease-in`}
              >
                {user.level
                  ? user.level.charAt(0).toUpperCase() + user.level.slice(1)
                  : 'Unknown'}
              </Badge>
              <Button variant="outline" disabled>
                {user.isAdmin ? 'Admin' : 'Member'}
              </Button>
              {userProps.isAdmin && !user.isAdmin && (
                <Button
                  disabled={isDeleting}
                  variant="destructive"
                  size="icon"
                  onClick={() => {
                    setIsAlertModalOpen(true)
                  }}
                >
                  <Icons.trash className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
