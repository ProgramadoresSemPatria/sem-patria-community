'use client'

import { toast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { type ExtendedPost } from '@/lib/types'
import { type Post } from '@prisma/client'
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

type UsePostProps = {
  initialPosts?: ExtendedPost[]
  post?: ExtendedPost | Post
}

export const usePost = ({ initialPosts, post }: UsePostProps) => {
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  const {
    mutateAsync: onCreatePost,
    isPending: isCreatingPost,
    isSuccess: isSuccessOnCreatePost
  } = useMutation({
    mutationKey: ['post'],
    mutationFn: async ({
      content,
      title,
      categoryId
    }: {
      categoryId: string
      title: string
      content: string
    }) => {
      return await api.post(`/api/post`, {
        content,
        categoryId,
        title
      })
    },
    onError: error => {
      toast({
        title: 'An error ocurred while creating post',
        description: error.message,
        variant: 'destructive'
      })
    }
  })

  const {
    mutateAsync: onUpdatePost,
    isPending: isUpdatingPost,
    isSuccess: isSuccessOnUpdatePost
  } = useMutation({
    mutationKey: ['update-post'],
    mutationFn: async ({
      postId,
      title,
      content,
      categoryId
    }: {
      postId: string
      title: string
      content: string
      categoryId: string
    }) => {
      return await api.put(`/api/post/${postId}`, {
        title,
        content,
        categoryId
      })
    },
    onSuccess: async () => {
      toast({
        title: 'Post updated!',
        description: 'The page will refresh to reflect the changes'
      })
    },
    onError: error => {
      toast({
        title: 'An error occurred while updating the post',
        description: error.message,
        variant: 'destructive'
      })
    }
  })

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [
      'infinite-posts',
      {
        category: searchParams.get('category'),
        orderBy: searchParams.get('orderBy'),
        search: searchParams.get('search')
      }
    ],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get(`/api/post`, {
        params: {
          category: searchParams.get('category'),
          orderBy: searchParams.get('orderBy'),
          search: searchParams.get('search'),
          page: pageParam,
          limit: 3
        }
      })
      return response.data
    },
    getNextPageParam: (_, allPages) => {
      return allPages.length + 1
    },
    initialData: {
      pages: [initialPosts],
      pageParams: [1]
    },
    initialPageParam: 1
  })

  const { mutateAsync: onLikePost } = useMutation({
    mutationKey: ['like-comment'],
    mutationFn: async () => {
      return await api.put(`/api/post/${post?.id}/likes`)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['video-comments'] })
    },
    onError: () => {
      toast({
        title: 'An error occurred.',
        description: 'Unable to like the comment',
        variant: 'destructive'
      })
    }
  })

  const { mutateAsync: onDeletePost, isPending: isDeleting } = useMutation({
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

  const { mutateAsync: onPinPost, isPending: isPinning } = useMutation({
    mutationKey: ['pin-post'],
    mutationFn: async ({ postId }: { postId: string }) => {
      return await api.put(`/api/post/${postId}/pin`)
    },
    onSuccess: async () => {
      toast({
        title: post?.isPinned ? 'Post unpinned ' : 'Post pinned',
        description: post?.isPinned
          ? 'The post has been unpinned'
          : 'The post has been pinned'
      })
    },
    onError: () => {
      toast({
        title: 'An error occurred.',
        description: 'Unable to pin the post',
        variant: 'destructive'
      })
    }
  })

  return {
    isFetchingNextPage,
    data,
    fetchNextPage,
    onLikePost,
    onPinPost,
    isPinning,
    onDeletePost,
    isDeleting,
    onCreatePost,
    isCreatingPost,
    isSuccessOnCreatePost,
    onUpdatePost,
    isUpdatingPost,
    isSuccessOnUpdatePost
  }
}
