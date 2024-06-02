import defaultAvatar from '@/assets/avatar.png'
import NoteEditor from '@/components/editor/editor'
import { useUser } from '@clerk/nextjs'
import { format } from 'date-fns'
import Image from 'next/image'
import { type ExtendedComment } from '../page'
import { ForumAdminActions } from './forum-comment-admin-actions'
import ReplyCommentSection from './reply-comment-section'

type CommentComponentProps = {
  comment: ExtendedComment
}

export const ForumCommentComponent = ({ comment }: CommentComponentProps) => {
  const { user } = useUser()
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
              className="rounded-full w-8 mr-1"
              alt=""
              width={500}
              height={500}
              src={comment.user.imageUrl || defaultAvatar}
            />
            <h2 className="font-semibold text-lg dark:text-slate-300 text-black">
              {comment.user.username}
            </h2>
          </>
          <p className="text-xs text-slate-500">
            {getStringFromDate(comment.createdAt)}
          </p>
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
