'use client'
import NoteEditor from '@/components/editor/editor'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import { type ReactElement } from 'react'
import { type ExtendedComment } from '../../page'
import { ForumCommentComponent } from '../forum-comment-component'
import SendCommentButton from '../send-comment-button'
import { useReplyCommentSection } from './use-reply-comment-section'

type CommentSectionProps = {
  commentId?: string
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
  const {
    handleLike,
    likeState,
    replyState,
    handleSetIsReplyOpen,
    isReplyOpen,
    isPending,
    replyContent,
    handleSendReply,
    setReplyContent
  } = useReplyCommentSection({ commentId, likes, replies })

  return (
    <>
      <Collapsible>
        <div className="flex gap-4">
          <div className="flex items-center w-fit space-x-1 font-bold  text-slate-600 text-sm">
            <Button
              variant="ghost"
              size="icon"
              className="group rounded-full hover:bg-transparent hover:text-orange-800"
              onClick={handleLike}
            >
              <Icons.upVote
                data-userliked={likeState.liked}
                className="h-5 data-[userliked=true]:text-orange-800  "
                strokeWidth={2}
              />
            </Button>
            <p
              data-userliked={likeState.liked}
              className="leading-4 data-[userliked=true]:text-orange-900"
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
                  className="group rounded-full data-[userreplied=true]:text-orange-900 hover:bg-white dark:hover:bg-transparent"
                >
                  <Icons.forum
                    data-userreplied={replyState.replied}
                    className="h-5 data-[userreplied=true]:text-orange-900 "
                    strokeWidth={2}
                  />
                </Button>
              </CollapsibleTrigger>
              <p
                data-userliked={replyState.replied}
                className="leading-4 data-[userliked=true]:text-orange-900"
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
              handleSetIsReplyOpen()
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
