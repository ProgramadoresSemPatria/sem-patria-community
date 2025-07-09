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
import { Can } from '@/hooks/use-ability'
import { usePermissionModal } from '@/hooks/modal/use-modal'
import { api } from '@/lib/api'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { type ExtendedComment } from '../[...titleSlug]/page'
import { ForumCommentComponent } from './forum-comment-component'
import SendCommentButton from './send-comment-button'
import { usePostComments } from './use-post-comments'

interface CommentSectionProps {
  postId?: string
  comments?: ExtendedComment[]
}

const CommentSection = ({ postId, comments }: CommentSectionProps) => {
  const [commentContent, setCommentContent] = useState('{}')
  const [isNewCommentOpen, setIsNewCommentOpen] = useState(false)
  const { onOpen: openPermissionModal } = usePermissionModal()

  const { commentsData, isFetching, refetch } = usePostComments({
    comments,
    postId
  })

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['send-comment'],
    mutationFn: async () => {
      await api.post(`/api/post/${postId}/comments`, {
        content: commentContent
      })
    },
    onSuccess: async () => {
      setIsNewCommentOpen(false)
      setCommentContent('{}')
      await refetch()
      toast({
        title: 'Your comment was sent!'
      })
    },
    onError: err => {
      console.error('Error sending comment', err)
      toast({
        title: 'An error occurred while sending your comment'
      })
    }
  })

  const handleSendComment = async () => {
    await mutateAsync()
  }

  const renderNewCommentButton = (onClick: () => void, disabled?: boolean) => (
    <Button
      size="sm"
      className="h-5 ring-1 bg-secondary hover:bg-secondary/80 text-brand-green-900 ring-muted gap-1"
      onClick={onClick}
      disabled={disabled}
    >
      {isNewCommentOpen ? (
        <>
          Close <Icons.close className="w-3 h-3" />
        </>
      ) : (
        <>
          New comment <Icons.plus className="w-3 h-3" />
        </>
      )}
    </Button>
  )

  const renderCommentForm = () => (
    <CollapsibleContent className="CollapsibleContent w-full mb-4">
      <NoteEditor
        variant="videoCommentInput"
        hasToolbar
        onChange={setCommentContent}
        editable={!isPending}
        initialValue={JSON.parse(commentContent)}
      />
      <SendCommentButton
        isPending={isPending}
        handleSendComment={handleSendComment}
      />
    </CollapsibleContent>
  )

  return (
    <Can I="view_comment" a="Post">
      {commentsData.length > 0 ? (
        <div className="flex flex-col w-full">
          <Collapsible
            className="flex flex-col w-full items-center pb-8"
            open={isNewCommentOpen}
          >
            <div className="flex w-full items-end gap-6 mb-2">
              <h2 id="comments" className="font-bold text-3xl leading-none">
                Comments
              </h2>
              <CollapsibleTrigger asChild>
                <>
                  <Can I="comment" a="Post">
                    {renderNewCommentButton(() => {
                      setIsNewCommentOpen(!isNewCommentOpen)
                    })}
                  </Can>
                  <Can not I="comment" a="Post">
                    {renderNewCommentButton(() => {
                      openPermissionModal()
                    }, true)}
                  </Can>
                </>
              </CollapsibleTrigger>

              {isFetching && <Icons.loader className="h-4 w-4 animate-spin" />}
            </div>

            <Can I="comment" a="Post">
              {renderCommentForm()}
            </Can>
          </Collapsible>
          {commentsData.map(comment => (
            <ForumCommentComponent key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <Collapsible
          className="flex flex-col w-full items-center pb-12"
          open={isNewCommentOpen}
        >
          <div className="flex items-end mb-2">
            <p id="comments" className="text-muted-foreground">
              No comments yet,
            </p>
            <CollapsibleTrigger asChild>
              <>
                <Can I="comment" a="Post">
                  <Button
                    className="underline text-muted-foreground px-1 py-0 h-fit leading-relaxed"
                    variant="link"
                    onClick={() => {
                      setIsNewCommentOpen(!isNewCommentOpen)
                    }}
                  >
                    be the first!
                  </Button>
                </Can>
                <Can not I="comment" a="Post">
                  <Button
                    className="underline text-muted-foreground px-1 py-0 h-fit leading-relaxed opacity-50 cursor-not-allowed"
                    variant="link"
                    onClick={openPermissionModal}
                  >
                    be the first!
                  </Button>
                </Can>
              </>
            </CollapsibleTrigger>
          </div>
          <Can I="comment" a="Post">
            {renderCommentForm()}
          </Can>
        </Collapsible>
      )}
    </Can>
  )
}

export default CommentSection
