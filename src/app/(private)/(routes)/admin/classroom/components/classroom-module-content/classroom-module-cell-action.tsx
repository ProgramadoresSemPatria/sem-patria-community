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
import { useModuleService } from '@/services/classroom/module/use-module-service'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { type ClassroomModuleColumn } from './columns'

type ClassroomModuleCellActionProps = {
  data: ClassroomModuleColumn
}

export const ClassroomModuleCellAction = ({
  data
}: ClassroomModuleCellActionProps) => {
  const { toast } = useToast()
  const router = useRouter()

  const { deleteImageModule, isDeletingImageModule } = useModuleService({})

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)

  const { mutateAsync: deleteClassroomModule, isPending: isDeleting } =
    useMutation({
      mutationFn: async () => {
        return await api.delete(`/api/classroom/module/${data.id}`)
      },
      onSuccess: () => {
        router.refresh()
        toast({
          title: 'Success',
          description: 'Module deleted successfully.'
        })
      },
      onError: err => {
        console.error('Error deleting classroom module', err)
        toast({
          title: 'Error',
          description: 'Something went wrong.',
          variant: 'destructive'
        })
      }
    })

  const onDeleteClassroomModule = async () => {
    try {
      if (data.fileUrl) {
        const image = data.fileUrl
        const imageKey = image.substring(image.lastIndexOf('/') + 1)
        deleteImageModule(imageKey)
      }
      await deleteClassroomModule()
    } catch (error) {
      console.log('Error deleting clasroom module', error)
      toast({
        title: 'Error',
        description: 'Something went wrong while deleting the Module.',
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
        description="Are you sure you want to delete this module?"
        onClose={() => {
          setIsAlertModalOpen(false)
        }}
        onConfirm={onDeleteClassroomModule}
        loading={isDeleting || isDeletingImageModule}
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
              router.push(`${appRoutes.admin_classroom}/module/${data.id}`)
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
