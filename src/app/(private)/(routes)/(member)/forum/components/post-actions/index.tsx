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
import { Can } from '@/hooks/use-ability'
import { type Post } from '@prisma/client'
import { usePostActions } from './use-post-actions'

type PostActionsProps = {
  post: Post
}

export const PostActions = ({ post }: PostActionsProps) => {
  const {
    isDeleteModalOpen,
    onOpenDeleteModal,
    onCloseDeleteModal,
    onDeletePost,
    isDeleting,
    onPinPost,
    isPinning
  } = usePostActions({ post })

  return (
    <>
      <AlertModal
        isOpen={isDeleteModalOpen}
        description="Are you sure you want to delete this post?"
        onClose={() => {
          onCloseDeleteModal()
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
              e.stopPropagation()
              onOpenDeleteModal()
            }}
          >
            {isDeleting ? (
              <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.trash className="mr-2 h-4 w-4" />
            )}
            Delete
          </DropdownMenuItem>
          <Can I="pin" an="Post">
            <DropdownMenuItem
              disabled={isPinning}
              onClick={e => {
                e.stopPropagation()
                void onPinPost()
              }}
            >
              {isDeleting ? (
                <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.send className="mr-2 h-4 w-4" />
              )}
              {post.isPinned ? 'Unpin' : 'Pin'}
            </DropdownMenuItem>
          </Can>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
