'use client'
import NoteEditor from '@/components/editor/editor'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { useAuth } from '@clerk/nextjs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import Image from 'next/image'
import { useReducer } from 'react'
import { AdminActions } from './admin-actions'
import { type CommentResponse } from './use-comments'

type CommentComponentProps = {
  comment: CommentResponse
}
export const CommentComponent = ({ comment }: CommentComponentProps) => {
  const { userId } = useAuth()
  const queryClient = useQueryClient()

  const getStringFromDate = (date: string) => {
    const commentDate = new Date(date)
    const todayDate = new Date()

    const diff = todayDate.getTime() - commentDate.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor(
      (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) / 60
    )

    if (days > 0) {
      if (days > 7) {
        return format(commentDate, 'dd/MM/yyyy')
      }
      return `${days} days ago`
    } else if (hours > 0) {
      return `${hours} hours ago`
    } else {
      return `${minutes} minutes ago`
    }
  }

  const { mutateAsync } = useMutation({
    mutationKey: ['like-comment'],
    mutationFn: async () => {
      return await api.put(`/api/comment/like/${comment.id}`)
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
      liked: comment.likes.includes(userId ?? ''),
      likes: comment.likes.length
    }
  )

  const handleLike = async () => {
    try {
      dispatch({ type: likeState.liked ? 'UNLIKE' : 'LIKE' })
      await mutateAsync()
    } catch (error) {
      dispatch({ type: likeState.liked ? 'LIKE' : 'UNLIKE' })
    }
  }

  return (
    <div
      key={comment.id}
      className="border-2 dark:border-slate-600 border-slate-300 rounded-md p-4"
    >
      <div className="flex justify-between">
        <div className="flex gap-2 items-center mb-2">
          <>
            <Image
              className="rounded-full w-8 mr-1"
              alt=""
              width={500}
              height={500}
              src={comment.userImg}
            />
            <h2 className="font-semibold text-lg dark:text-slate-300 text-black">
              {comment.username}
            </h2>
          </>
          <p className="text-xs dark:text-slate-500 text-black">
            {getStringFromDate(comment.date)}
          </p>
        </div>
        <AdminActions commentId={comment.id} />
      </div>
      <NoteEditor editable={false} initialValue={JSON.parse(comment.comment)} />
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
    </div>
  )
}
