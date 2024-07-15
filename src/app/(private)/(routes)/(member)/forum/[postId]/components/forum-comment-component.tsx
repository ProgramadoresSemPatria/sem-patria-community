import defaultAvatar from '@/assets/avatar.png'
import NoteEditor from '@/components/editor/editor'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useUser } from '@clerk/nextjs'
import { format } from 'date-fns'
import Image from 'next/image'
import { type ExtendedComment } from '../[...titleSlug]/page'
import { ForumAdminActions } from './forum-comment-admin-actions'
import ReplyCommentSection from './reply-comment-section'

type CommentComponentProps = {
  comment: ExtendedComment
}

export const ForumCommentComponent = ({ comment }: CommentComponentProps) => {
  const { user } = useUser()
  const getStringFromDate = (date: string): string => {
    const commentDate = new Date(date)
    const todayDate = new Date()

    const diffInMillis = todayDate.getTime() - commentDate.getTime()
    const diffInMinutes = Math.floor(diffInMillis / (1000 * 60))
    const diffInHours = Math.floor(diffInMinutes / 60)
    const diffInDays = Math.floor(diffInHours / 24)

    if (diffInDays > 0) {
      if (diffInDays > 7) {
        return format(commentDate, 'dd/MM/yyyy')
      }
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
    } else {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
    }
  }

  const isOwnerOrAdmin =
    user?.id === comment.userId || user?.publicMetadata.role === 'Admin'

  return (
    <div
      key={comment.id}
      className="border-b last:border-none border-slate-900 rounded-md p-4"
    >
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <>
            <Image
              className="rounded-full w-8 h-8 mr-1"
              alt="User avatar"
              width={500}
              height={500}
              src={comment.user.imageUrl || defaultAvatar}
            />
            <h2 className="font-semibold text-lg dark:text-slate-300 text-black">
              {comment.user.username !== ''
                ? comment.user.username
                : comment.user.name}
            </h2>
          </>
          {comment.createdAt && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="text-xs text-slate-500">
                    {getStringFromDate(comment.createdAt)}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  {format(
                    new Date(comment.createdAt),
                    'dd/MM/yyyy, HH:mm:ss O'
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {isOwnerOrAdmin && <ForumAdminActions commentId={comment.id} />}
      </div>
      <NoteEditor
        variant="readonly"
        editable={false}
        initialValue={JSON.parse(comment.comment)}
      />
      <ReplyCommentSection
        commentId={comment.id}
        replyToId={comment.replyToId}
        replies={comment?.replies}
        likes={comment?.likes}
      />
    </div>
  )
}
