'use client'
import { Icons } from '@/components/icons'
import { AlertModal } from '@/components/modals/alert-modal'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { toast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'

interface ForumAdminActionsProps {
  commentId: string
}
export const ForumAdminActions = ({ commentId }: ForumAdminActionsProps) => {
  const { postId } = useParams()
  const queryClient = useQueryClient()
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['delete-comment'],
    mutationFn: async () => {
      return await api.delete(`/api/comment`, {
        data: { commentId }
      })
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ['get-comments', postId]
      })
      toast({
        title: 'Comment deleted',
        description: 'The comment has been deleted'
      })
      setIsAlertModalOpen(false)
    },
    onError: () => {
      toast({
        title: 'An error occurred.',
        description: 'Unable to delete the comment',
        variant: 'destructive'
      })
    }
  })

  const handleDelete = useCallback(async () => {
    await mutateAsync()
  }, [mutateAsync])

  const adminActions = useMemo(() => {
    return [
      {
        label: 'Delete comment',
        icon: <Icons.trash className="h-4" />,
        onClick: handleDelete,
        isPending
      }
    ]
  }, [handleDelete, isPending])

  return (
    <div className="flex gap-2 items-center ">
      <AlertModal
        isOpen={isAlertModalOpen}
        description="Are you sure you want to delete this comment?"
        onClose={() => {
          setIsAlertModalOpen(false)
        }}
        onConfirm={handleDelete}
        loading={isPending}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="group rounded-full">
            <Icons.moreMenu className="transition-colors text-slate-600 group-hover:text-white h-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit">
          {adminActions.map(action => (
            <DropdownMenuItem
              key={action.label}
              onClick={() => {
                setIsAlertModalOpen(true)
              }}
            >
              {action.icon}
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
