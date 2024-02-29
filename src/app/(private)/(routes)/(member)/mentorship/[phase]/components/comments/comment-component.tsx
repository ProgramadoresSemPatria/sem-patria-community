import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/nextjs'
import { format } from 'date-fns'
import Image from 'next/image'
import { AdminActions } from './admin-actions'
import { type Comment } from './comments'

interface CommentComponentProps {
  comment: Comment
}
export const CommentComponent = ({ comment }: CommentComponentProps) => {
  const { userId } = useAuth()

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

  return (
    <div
      key={comment.id}
      className="border-b last:border-none border-slate-900 rounded-md p-4"
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
            <h2 className="font-semibold text-lg text-slate-300">
              {comment.username}
            </h2>
          </>
          <p className="text-xs text-slate-500">
            {getStringFromDate(comment.date)}
          </p>
        </div>
        <AdminActions commentId={comment.id} />
      </div>
      <p className="text-sm">{comment.comment}</p>
      <div className="flex items-center w-fit space-x-1 mt-2 font-bold text-slate-600 text-sm">
        <Button variant="ghost" size="icon" className="group rounded-full ">
          <Icons.upVote
            data-userliked={comment.likes.includes(userId ?? '')}
            className="h-5 data-[userliked=true]:text-violet-900 group-hover:text-white "
            strokeWidth={2}
          />
        </Button>
        <p
          data-userliked={comment.likes.includes(userId ?? '')}
          className="leading-4 data-[userliked=true]:text-violet-900"
        >
          {comment.likes.length}
        </p>
      </div>
    </div>
  )
}
