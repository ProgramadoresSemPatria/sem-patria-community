import { toast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { useAuth } from '@clerk/nextjs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useEffect, useReducer, useState } from 'react'
import { type ExtendedComment } from '../../[...titleSlug]/page'

type UseReplyCommentSectionProps = {
  commentId?: string
  replies: ExtendedComment[]
  likes: ExtendedComment['likes']
}

export const useReplyCommentSection = ({
  commentId,
  likes,
  replies
}: UseReplyCommentSectionProps) => {
  const { postId } = useParams()

  const queryClient = useQueryClient()
  const { userId } = useAuth()

  const [isReplyOpen, setIsReplyOpen] = useState(false)
  const [replyContent, setReplyContent] = useState('{}')

  const { mutateAsync } = useMutation({
    mutationKey: ['like-comment'],
    mutationFn: async () => {
      return await api.put(`/api/comment/like/${commentId}`)
    },
    onError: err => {
      console.log('Error trying to like comment', err)
      toast({
        title: 'An error occurred.',
        description: 'Unable to like the comment',
        variant: 'destructive'
      })
    }
  })

  const handleSetIsReplyOpen = () => {
    setIsReplyOpen(prev => !prev)
  }

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
      liked: likes?.some(
        like => like.userId === userId && like.commentId === commentId
      ),
      likes: likes?.length
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

  const { mutateAsync: mutateAsyncReply, isPending } = useMutation({
    mutationKey: ['send-reply'],
    mutationFn: async () => {
      await api.post(`/api/comment/reply/${commentId}`, {
        content: replyContent
      })
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ['get-comments', postId]
      })
      setIsReplyOpen(false)
      setReplyContent('{}')
      toast({
        title: 'Your reply was sent!'
      })
    },
    onError: err => {
      console.log('Error replying comment', err)
      toast({
        title: 'An error occurred while sending your reply'
      })
    }
  })

  const handleSendReply = async () => {
    try {
      await mutateAsyncReply()
      dispatchReply({ type: 'REPLY' })
    } catch (error) {
      dispatchReply({ type: 'UNREPLY' })
    }
  }

  const [replyState, dispatchReply] = useReducer(
    (
      state: { replies: number; replied: boolean },
      action: { type: string }
    ) => {
      switch (action.type) {
        case 'REPLY':
          return { ...state, replied: true, replies: state.replies + 1 }
        case 'UNREPLY':
          return { ...state, replied: false, likes: state.replies - 1 }
        case 'SYNC':
          return { ...state, replies: replies?.length }
        default:
          return state
      }
    },
    {
      replied: replies?.some(
        reply => reply.userId === userId && reply.replyToId === commentId
      ),
      replies: replies?.length
    }
  )

  useEffect(() => {
    dispatchReply({ type: 'SYNC' })
  }, [replies])

  return {
    handleLike,
    likeState,
    replyState,
    handleSetIsReplyOpen,
    isReplyOpen,
    isPending,
    replyContent,
    handleSendReply,
    setReplyContent
  }
}
