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
import { type ClassroomVideoColumn } from './columns'

type ClassroomVideoCellActionProps = {
  data: ClassroomVideoColumn
}

export const ClassroomVideoCellAction = ({
  data
}: ClassroomVideoCellActionProps) => {
  const { toast } = useToast()
  const router = useRouter()

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)

  const { mutateAsync: deleteClassroomVideo, isPending: isDeleting } =
    useMutation({
      mutationFn: async () => {
        return await api.delete(`/api/classroom/video/${data.id}`)
      },
      onSuccess: () => {
        router.refresh()
        toast({
          title: 'Success',
          description: 'Video deleted successfully.'
        })
      },
      onError: err => {
        console.error('Error deletin classroom video', err)
        toast({
          title: 'Error',
          description: 'Something went wrong.',
          variant: 'destructive'
        })
      }
    })

  const onDeleteClassroomVideo = async () => {
    try {
      await deleteClassroomVideo()
    } catch (error) {
      console.log('Error deleting classroom video', error)
      toast({
        title: 'Error',
        description: 'Something went wrong while deleting the Video.',
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
        description="Are you sure you want to delete this video? This action will delete all the attachments associated with this video and cannot be undone."
        onClose={() => {
          setIsAlertModalOpen(false)
        }}
        onConfirm={onDeleteClassroomVideo}
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
            onClick={() => {
              router.push(`${appRoutes.admin_classroom}/video/${data.id}`)
            }}
          >
            <Icons.edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <Can I="delete" a="Classroom">
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
