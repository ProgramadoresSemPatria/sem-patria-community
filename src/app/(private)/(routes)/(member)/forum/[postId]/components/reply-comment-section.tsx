'use client'
import NoteEditor from '@/components/editor/editor'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import { toast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { useAuth } from '@clerk/nextjs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useEffect, useReducer, useState, type ReactElement } from 'react'
import { type ExtendedComment } from '../page'
import { ForumCommentComponent } from './forum-comment-component'
import SendCommentButton from './send-comment-button'

interface CommentSectionProps {
  commentId: string | undefined
  replyToId: string | null
  replies: ExtendedComment[]
  likes: ExtendedComment['likes']
}

const ReplyCommentSection = ({
  commentId,
  replyToId,
  replies,
  likes
}: CommentSectionProps) => {
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
    onError: () => {
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

  return (
    <>
      <Collapsible>
        <div className="flex gap-4">
          <div className="flex items-center w-fit space-x-1 font-bold text-slate-600 text-sm">
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

          {!replyToId && (
            <div className="flex items-center w-fit space-x-1 font-bold text-slate-600 text-sm">
              <CollapsibleTrigger asChild>
                <Button
                  data-userreplied={replyState.replied}
                  variant="ghost"
                  size="icon"
                  className="group rounded-full data-[userreplied=true]:text-violet-900"
                >
                  <Icons.forum
                    data-userreplied={replyState.replied}
                    className="h-5 data-[userreplied=true]:text-violet-900 group-hover:text-white"
                    strokeWidth={2}
                  />
                </Button>
              </CollapsibleTrigger>
              <p
                data-userliked={replyState.replied}
                className="leading-4 data-[userliked=true]:text-violet-900"
              >
                {replyState.replies}
              </p>
            </div>
          )}
        </div>
        <CollapsibleContent className="CollapsibleContent w-full mb-4 p-2 border border-primary-foreground rounded-md shadow-lg">
          {replies?.map(comment => (
            <ForumCommentComponent key={comment.id} comment={comment} />
          ))}
          <NewCommentButton
            hasReplies={replies?.length > 0}
            onClick={() => {
              setIsReplyOpen(prev => !prev)
            }}
            isOpen={isReplyOpen}
          >
            <>
              <NoteEditor
                variant="videoCommentInput"
                hasToolbar
                onChange={setReplyContent}
                editable={!isPending}
                initialValue={JSON.parse(replyContent)}
              />
              <SendCommentButton
                isPending={isPending}
                handleSendComment={handleSendReply}
                isReply
              />
            </>
          </NewCommentButton>
        </CollapsibleContent>
      </Collapsible>
    </>
  )
}

const NewCommentButton = ({
  children,
  hasReplies,
  onClick,
  isOpen
}: {
  children: ReactElement
  hasReplies: boolean
  onClick: () => void
  isOpen: boolean
}) => {
  return (
    <Collapsible
      className="flex flex-col w-full items-center mt-2"
      open={isOpen}
    >
      <CollapsibleTrigger asChild>
        <Button
          className="underline"
          size="sm"
          variant="ghost"
          onClick={onClick}
        >
          {hasReplies ? 'Reply thread' : 'Be the first to reply'}{' '}
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="CollapsibleContent w-full mb-4 mt-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}

export default ReplyCommentSection
