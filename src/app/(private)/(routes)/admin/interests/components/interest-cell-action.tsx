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
import { appRoutes } from '@/lib/constants'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { type InterestColumn } from './columns'
import { useInterest } from '@/hooks/interest/use-interest'

type InterestCellActionProps = {
  data: InterestColumn
}

export const InterestCellAction = ({ data }: InterestCellActionProps) => {
  const { toast } = useToast()
  const router = useRouter()

  const { useDeleteInterests } = useInterest()

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)

  const { mutateAsync: deleteInterest, isPending: isDeleting } =
    useDeleteInterests(data.id, {
      onSuccess: () => {
        router.refresh()
        toast({
          title: 'Success',
          description: 'Interest deleted successfully.'
        })
      },
      onError: err => {
        console.error('Error deleting category', err)
        toast({
          title: 'Error',
          description: 'Something went wrong.',
          variant: 'destructive'
        })
      }
    })

  const onDeleteInterest = async () => {
    try {
      await deleteInterest()
    } catch (error) {
      console.log('Error deleting category', error)

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
        description="This action will delete the interest."
        onClose={() => {
          setIsAlertModalOpen(false)
        }}
        onConfirm={onDeleteInterest}
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
              router.push(`${appRoutes.admin_interests}/${data.id}`)
            }}
          >
            <Icons.edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <Can I="delete" a="Interest">
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
