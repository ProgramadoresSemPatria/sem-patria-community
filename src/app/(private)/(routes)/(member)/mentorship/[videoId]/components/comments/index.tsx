'use client'
import { Icons } from '@/components/icons'
import { RichTextInput } from '@/components/rich-text-input'
import { Skeleton } from '@/components/ui/skeleton'
import { type Video } from '@prisma/client'
import { CommentComponent } from './comment-component'
import { OrderBy } from './order-by'
import { useComments } from './use-comments'

type CommentsProps = {
  videoProps: Video
}

export const Comments = ({ videoProps }: CommentsProps) => {
  const {
    isFetching,
    isLoading,
    orderedComments,
    setOrderBy,
    comments,
    orderBy
  } = useComments({
    videoProps
  })

  const CommentsLoading = () => {
    return Array.from({ length: 3 }).map((_, index) => (
      <Skeleton key={index} className="w-full h-40" />
    ))
  }

  return (
    <div className="overflow-x-auto max-h-[500px] h-min mx-2 w-auto rounded-md p-6 flex flex-col">
      {isFetching && <Icons.loader className="ml-auto w-6 h-6 animate-spin" />}
      <div className="flex gap-4 items-center mb-6">
        {isLoading ? (
          <Skeleton className="w-36 h-10" />
        ) : (
          <>
            <h1 className="flex items-center gap-1 font-semibold text-xl">
              <span className="tabular-nums"> {comments.length}</span> Comments
            </h1>
            <OrderBy orderByValue={orderBy} setOrderByValue={setOrderBy} />
          </>
        )}
      </div>
      <RichTextInput isCommentsLoading={isLoading} videoId={videoProps.id} />
      <div className="flex flex-col gap-4 mt-6">
        {isLoading ? (
          <CommentsLoading />
        ) : (
          orderedComments.map(comment => (
            <CommentComponent key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  )
}
