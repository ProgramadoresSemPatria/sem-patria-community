'use client'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { type ExtendedPost } from '@/lib/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useReducer } from 'react'

interface PostLikeProps {
  post: ExtendedPost
  initialVotesAmt: number
  initialVote?: boolean
  userId: string
}
const PostLike = ({
  initialVotesAmt,
  userId,
  post,
  initialVote
}: PostLikeProps) => {
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationKey: ['like-comment'],
    mutationFn: async () => {
      return await api.put(`/api/post/${post.id}/likes`)
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

  const [likeState, dispatch] = useReducer(
    (state: { likes: number; liked: boolean }, action: { type: string }) => {
      switch (action.type) {
        case 'LIKE':
          return { ...state, liked: true, likes: state.likes + 1 }
        case 'UNLIKE':
          return { ...state, liked: false, likes: state.likes - 1 }
        default:
          return state
      }
    },
    {
      liked: post.likes.some(
        like => like.userId === userId && like.postId === post.id
      ),
      likes: post.likes.length
    }
  )

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    try {
      dispatch({ type: likeState.liked ? 'UNLIKE' : 'LIKE' })
      await mutateAsync()
    } catch (error) {
      dispatch({ type: likeState.liked ? 'LIKE' : 'UNLIKE' })
    }
  }

  return (
    <div className="flex items-center w-fit space-x-1 mt-2 font-bold text-slate-600 text-sm">
      <Button
        variant="ghost"
        size="icon"
        className="group rounded-full"
        onClick={handleLike}
      >
        <Icons.upVote
          data-userliked={likeState.liked}
          className="h-5 data-[userliked=true]:text-violet-900 group-hover:text-white "
          strokeWidth={2}
        />
      </Button>
      <p
        data-userliked={likeState.liked}
        className="leading-4 data-[userliked=true]:text-violet-900"
      >
        {likeState.likes}
      </p>
    </div>
  )
}

export default PostLike
