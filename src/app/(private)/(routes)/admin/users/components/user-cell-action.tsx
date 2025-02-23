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
import { type Cell } from '@tanstack/react-table'

type UserCellActionProps = {
  data: UserColumn
  cell: Cell<UserColumn, unknown>
}

export const UserCellAction = ({ data, cell }: UserCellActionProps) => {
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
    onError: err => {
      console.error('Error deleting user', err)
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
      console.log('Error deleting user', error)
      toast({
        title: 'Error',
        description: 'Something went wrong while deleting the user.',
        variant: 'destructive'
      })
    } finally {
      setIsAlertModalOpen(false)
    }
  }

  const { mutateAsync: enableUser, isPending: isEnablingUser } = useMutation({
    mutationFn: async () => {
      return await api.patch(`/api/user/${data.id}/enable`)
    },
    onSuccess: () => {
      router.push(appRoutes.admin_users)
      router.refresh()
      toast({
        title: 'Success',
        description: 'User was enabled successfully.'
      })
    },
    onError: error => {
      toast({
        title: 'Error',
        description: error.message ?? 'Something went wrong.',
        variant: 'destructive'
      })
    }
  })

  const onEnableUser = async () => {
    try {
      await enableUser()
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
        description={`This action will ${
          data?.isDisabled ? 'enable' : 'disable'
        } this user account, are you sure?`}
        confirmationTitle={data?.isDisabled ? 'Enable' : 'Delete'}
        loading={isDeleting || isEnablingUser}
        onClose={() => {
          setIsAlertModalOpen(false)
        }}
        onConfirm={async () => {
          if (data?.isDisabled) {
            await onEnableUser()
            return
          }
          await onDeleteUser()
        }}
      />
      <DropdownMenu>
        <DropdownMenuTrigger data-testid={`...${cell.id}`} asChild>
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
              disabled={data.isDisabled}
            >
              <Icons.trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setIsAlertModalOpen(true)
              }}
              disabled={!data.isDisabled}
            >
              <Icons.userCheck className="mr-2 h-4 w-4" />
              Enable
            </DropdownMenuItem>
          </Can>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
