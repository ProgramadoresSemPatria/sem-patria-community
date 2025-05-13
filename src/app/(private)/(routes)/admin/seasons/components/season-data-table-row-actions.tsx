'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { appRoutes } from '@/lib/constants'
import { type Season } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AlertModal } from '@/components/modals/alert-modal'
import { useToast } from '@/components/ui/use-toast'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/api'

type SeasonDataTableRowActionsProps = {
  data: Season
}

export const SeasonDataTableRowActions = ({
  data
}: SeasonDataTableRowActionsProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)

  const { mutateAsync: deleteSeason, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      return await api.delete(`/api/season/${data.id}`)
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'The season has been deleted successfully.'
      })
    },
    onError: err => {
      console.error('Error deleting season', err)
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    }
  })

  const handleDelete = async () => {
    await deleteSeason()
    router.refresh()
    setIsAlertModalOpen(false)
  }

  return (
    <>
      <AlertModal
        isOpen={isAlertModalOpen}
        description="This action will delete the season."
        onClose={() => {
          setIsAlertModalOpen(false)
        }}
        onConfirm={handleDelete}
        loading={isDeleting}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <Icons.spread className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              router.push(`${appRoutes.admin_seasons}/${data.id}`)
            }}
          >
            Edit
            <DropdownMenuShortcut>
              <Icons.edit size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              router.push(
                `${appRoutes.admin_seasons}/${data.id}/score-activities`
              )
            }}
          >
            Score Activities
            <DropdownMenuShortcut>
              <Icons.activity size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="!text-red-500 cursor-pointer"
            onClick={() => {
              setIsAlertModalOpen(true)
            }}
          >
            Delete
            <DropdownMenuShortcut>
              <Icons.trash size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
