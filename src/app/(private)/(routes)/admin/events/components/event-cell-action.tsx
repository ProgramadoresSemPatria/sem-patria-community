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
import { api } from '@/lib/api'
import { appRoutes } from '@/lib/constants'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { type EventColumn } from './columns'

type EventCellActionProps = {
  data: EventColumn
}

export const EventCellAction = ({ data }: EventCellActionProps) => {
  const { toast } = useToast()
  const router = useRouter()

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)

  const { mutateAsync: deleteEvent, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      return await api.delete(`/api/event/${data.id}`)
    },
    onSuccess: () => {
      router.refresh()
      toast({
        title: 'Success',
        description: 'The event has been deleted successfully.'
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

  const onCopy = async (url: string) => {
    await navigator.clipboard.writeText(url)
    toast({
      title: 'Copy',
      description: 'Event external URL copied to the clipboard.'
    })
  }

  const onDeleteEvent = async () => {
    try {
      await deleteEvent()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong while deleting the event.',
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
        description="Are you sure you want to delete this event?"
        onClose={() => {
          setIsAlertModalOpen(false)
        }}
        onConfirm={onDeleteEvent}
        loading={isDeleting}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <Icons.spread className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={async () => {
              await onCopy(data.externalUrl)
            }}
          >
            <Icons.copy className="mr-2 h-4 w-4" />
            Copy Url
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push(`${appRoutes.admin_events}/${data.id}`)
            }}
          >
            <Icons.edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setIsAlertModalOpen(true)
            }}
          >
            <Icons.trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
