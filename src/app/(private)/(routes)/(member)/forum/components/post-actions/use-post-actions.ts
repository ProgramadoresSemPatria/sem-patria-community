import { toast } from '@/components/ui/use-toast'
import { usePost } from '@/hooks/post/use-post'
import { type Post } from '@prisma/client'
import { useState } from 'react'

type UsePostActions = {
  post: Post
}
export const usePostActions = ({ post }: UsePostActions) => {
  const {
    onPinPost: pinPost,
    onDeletePost: deletePost,
    isDeleting,
    isPinning
  } = usePost({})

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const onOpenDeleteModal = () => {
    setIsDeleteModalOpen(true)
  }

  const onCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const onPinPost = async () => {
    try {
      await pinPost({ postId: post.id })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    }
  }

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
  return {
    isDeleteModalOpen,
    onOpenDeleteModal,
    onCloseDeleteModal,
    onDeletePost,
    isDeleting,
    onPinPost,
    isPinning
  }
}
