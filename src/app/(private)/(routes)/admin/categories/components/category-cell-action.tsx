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
import { useCategory } from '@/hooks/category/use-category'
import { appRoutes } from '@/lib/constants'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { type CategoryColumn } from './columns'

type CategoryCellActionProps = {
  data: CategoryColumn
}

export const CategoryCellAction = ({ data }: CategoryCellActionProps) => {
  const { toast } = useToast()
  const router = useRouter()

  const { useDeleteCategory } = useCategory()

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)

  const { mutateAsync: deleteCategory, isPending: isDeleting } =
    useDeleteCategory(data.id, {
      onSuccess: () => {
        router.refresh()
        toast({
          title: 'Success',
          description: 'Category deleted successfully.'
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

  const onDeleteCategory = async () => {
    try {
      await deleteCategory()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong while deleting the category.',
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
        description="This action will delete the category and all courses vinculated to it."
        onClose={() => {
          setIsAlertModalOpen(false)
        }}
        onConfirm={onDeleteCategory}
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
              router.push(`${appRoutes.admin_categories}/${data.id}`)
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
