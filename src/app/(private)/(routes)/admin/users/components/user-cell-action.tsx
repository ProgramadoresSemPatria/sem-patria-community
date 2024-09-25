'use client'

import { Icons } from '@/components/icons'
import { AlertModal } from '@/components/modals/alert-modal'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/use-toast'
import { Can } from '@/hooks/use-ability'
import { api } from '@/lib/api'
import { appRoutes } from '@/lib/constants'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { type UserColumn } from './columns'

type UserCellActionProps = {
  data: UserColumn
}

export const UserCellAction = ({ data }: UserCellActionProps) => {
  const { toast } = useToast()
  const router = useRouter()

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)

  const { mutateAsync: deleteUser, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      return await api.delete(`/api/user/${data.id}`)
    },
    onSuccess: () => {
      router.refresh()
      toast({
        title: 'Success',
        description: 'The user has been deleted successfully.'
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Something went wrong while deleting the user.',
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
        description: 'Something went wrong while deleting the user.',
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
        onClose={() => {
          setIsAlertModalOpen(false)
        }}
        onConfirm={onDeleteUser}
        loading={isDeleting}
      />
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="..." asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <Icons.spread className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              router.push(`${appRoutes.admin_users}/${data.id}`)
            }}
          >
            <Icons.edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <Can I="delete" a="User">
            <DropdownMenuItem
              onClick={() => {
                setIsAlertModalOpen(true)
              }}
            >
              <Icons.trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </Can>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
