'use client'
import NoteEditor from '@/components/editor/editor'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import { Can } from '@/hooks/use-ability'
import { usePermissionModal } from '@/hooks/modal/use-modal'
import { type ReactElement } from 'react'
import { type ExtendedComment } from '../../[...titleSlug]/page'
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
  const { onOpen: openPermissionModal } = usePermissionModal()

  const renderLikeButton = (onClick: () => void, disabled?: boolean) => (
    <div className="flex items-center w-fit space-x-1 font-bold text-slate-600 text-sm">
      <Button
        variant="ghost"
        size="icon"
        className="group rounded-full hover:bg-transparent hover:text-accent"
        onClick={onClick}
        disabled={disabled}
      >
        <Icons.upVote
          data-userliked={likeState.liked}
          className="h-5 data-[userliked=true]:text-primary"
          strokeWidth={2}
        />
      </Button>
      <p
        data-userliked={likeState.liked}
        className="leading-4 data-[userliked=true]:text-primary"
      >
        {likeState.likes}
      </p>
    </div>
  )

  const renderReplyButton = (onClick: () => void, disabled?: boolean) => (
    <div className="flex items-center w-fit space-x-1 font-bold text-slate-600 text-sm">
      <CollapsibleTrigger asChild>
        <Button
          data-userreplied={replyState.replied}
          variant="ghost"
          size="icon"
          disabled={disabled}
          className="group rounded-full data-[userreplied=true]:text-primary hover:bg-white dark:hover:bg-transparent"
        >
          <Icons.forum
            data-userreplied={replyState.replied}
            className="h-5 data-[userreplied=true]:text-primary"
            strokeWidth={2}
          />
        </Button>
      </CollapsibleTrigger>
      <p
        data-userliked={replyState.replied}
        className="leading-4 data-[userliked=true]:text-primary"
      >
        {replyState.replies}
      </p>
    </div>
  )

  return (
    <Can I="view_comment" a="Post">
      <Collapsible>
        <div className="flex gap-4">
          <Can I="like" a="Post">
            {renderLikeButton(handleLike)}
          </Can>
          <Can not I="like" a="Post">
            {renderLikeButton(openPermissionModal, true)}
          </Can>

          {!replyToId && (
            <>
              <Can I="comment" a="Post">
                {renderReplyButton(handleSetIsReplyOpen)}
              </Can>
              <Can not I="comment" a="Post">
                {renderReplyButton(openPermissionModal, true)}
              </Can>
            </>
          )}
        </div>
        <CollapsibleContent className="CollapsibleContent w-full mb-4 p-2 border border-card rounded-md shadow-lg">
          {replies?.map(comment => (
            <ForumCommentComponent key={comment.id} comment={comment} />
          ))}
          <Can I="comment" a="Post">
            <NewCommentButton
              hasReplies={replies?.length > 0}
              onClick={handleSetIsReplyOpen}
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
          </Can>
        </CollapsibleContent>
      </Collapsible>
    </Can>
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
