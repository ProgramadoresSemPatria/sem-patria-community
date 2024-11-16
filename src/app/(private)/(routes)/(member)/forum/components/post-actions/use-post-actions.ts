import { toast } from '@/components/ui/use-toast'
import { usePost } from '@/hooks/post/use-post'
import { type ExtendedPost } from '@/lib/types'
import { type Post } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

type UsePostActions = {
  post: Post | ExtendedPost
}
export const usePostActions = ({ post }: UsePostActions) => {
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()

  const {
    onPinPost: pinPost,
    onDeletePost: deletePost,
    isDeleting,
    isPinning
  } = usePost({ post })

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
      await queryClient.refetchQueries({
        queryKey: ['infinite-posts', { category: searchParams.get('category') }]
      })
    } catch (error) {
      console.log('Error on pin post', error)
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
      await queryClient.refetchQueries({
        queryKey: ['infinite-posts', { category: searchParams.get('category') }]
      })
    } catch (error) {
      console.log('Error deleting post', error)
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
