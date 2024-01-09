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
import { type CourseColumn } from './columns'

type CourseCellActionProps = {
  data: CourseColumn
}

export const CourseCellAction = ({ data }: CourseCellActionProps) => {
  const { toast } = useToast()
  const router = useRouter()

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)

  const { mutateAsync: deleteCourse, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      return await api.delete(`/api/course/${data.id}`)
    },
    onSuccess: () => {
      router.refresh()
      toast({
        title: 'Success',
        description: 'Course deleted successfully.'
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

  const { mutateAsync: updateCourse } = useMutation({
    mutationFn: async () => {
      return await api.patch(`/api/course/${data.id}`, {
        ...data,
        isPending: false
      })
    },

    onSuccess: () => {
      router.refresh()
      toast({
        title: 'Success',
        description: 'Course approved successfully.'
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
      description: 'Course Url copied to the clipboard.'
    })
  }

  const onDeleteCourse = async () => {
    try {
      await deleteCourse()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong while deleting the course.',
        variant: 'destructive'
      })
    } finally {
      setIsAlertModalOpen(false)
    }
  }

  const onApproveCourse = async () => {
    try {
      await updateCourse()
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Something went wrong while approving the course.',
        variant: 'destructive'
      })
    }
  }
  return (
    <>
      <AlertModal
        isOpen={isAlertModalOpen}
        description="Are you sure you want to delete this course?"
        onClose={() => {
          setIsAlertModalOpen(false)
        }}
        onConfirm={onDeleteCourse}
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
              await onCopy(data.courseUrl)
            }}
          >
            <Icons.copy className="mr-2 h-4 w-4" />
            Copy Url
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push(`${appRoutes.admin_courses}/${data.id}`)
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
          {data.isPending && (
            <DropdownMenuItem
              onClick={async () => {
                await onApproveCourse()
              }}
            >
              <Icons.check className="mr-2 h-4 w-4" />
              Approve
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
