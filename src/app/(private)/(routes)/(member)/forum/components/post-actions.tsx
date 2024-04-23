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
import { toast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { type Post } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

type PostActionsProps = {
  post: Post
}

export const PostActions = ({ post }: PostActionsProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const { mutateAsync: deletePost, isPending: isDeleting } = useMutation({
    mutationKey: ['delete-post'],
    mutationFn: async ({ postId }: { postId: string }) => {
      return await api.delete(`/api/post/${postId}`)
    },
    onSuccess: async () => {
      toast({
        title: 'Post deleted',
        description: ' The post has been deleted'
      })
    },
    onError: () => {
      toast({
        title: 'An error occurred.',
        description: 'Unable to delete the post',
        variant: 'destructive'
      })
    }
  })

  const onDeletePost = async () => {
    try {
      await deletePost({ postId: post.id })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    } finally {
      setIsDeleteModalOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={isDeleteModalOpen}
        description="Are you sure you want to delete this post?"
        onClose={() => {
          setIsDeleteModalOpen(false)
        }}
        onConfirm={onDeletePost}
        loading={isDeleting}
      />
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="..." asChild>
          <Button variant="outline" size="icon">
            <span className="sr-only">Open menu</span>
            <Icons.spreadVertical className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            disabled={isDeleting}
            onClick={e => {
              e.preventDefault()
              setIsDeleteModalOpen(true)
            }}
          >
            {isDeleting ? (
              <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.trash className="mr-2 h-4 w-4" />
            )}
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
