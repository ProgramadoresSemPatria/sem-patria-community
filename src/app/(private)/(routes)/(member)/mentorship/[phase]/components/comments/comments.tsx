'use client'
import { Icons } from '@/components/icons'
import { RichTextInput } from '@/components/rich-text-input'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { CommentComponent } from './comment-component'
import { OrderBy } from './order-by'

export interface Comment {
  id: string
  username: string
  userImg: string
  comment: string
  date: string
  likes: string[]
}

export const Comments = () => {
  const [orderBy, setOrderBy] = useState('recent')

  const {
    data: comments = [],
    isLoading,
    isFetching
  } = useQuery<Comment[]>({
    queryKey: ['comments'],
    queryFn: async () => {
      const { data } = await api.get(
        `/api/comment/a90654b5-e855-4df6-914f-26873e89e4d6`
      )
      return data
    }
  })

  const orderedComments = useMemo(
    () =>
      comments.sort((a, b) => {
        if (orderBy === 'recent') {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        }
        return b.likes.length - a.likes.length
      }),
    [orderBy, comments]
  )

  const CommentsLoading = () => {
    return Array.from({ length: 3 }).map((_, index) => (
      <Skeleton key={index} className="w-full h-40" />
    ))
  }

  return (
    <div className="mx-2 w-auto ring-1 ring-slate-800 rounded-md p-6 flex flex-col">
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
      <RichTextInput
        isCommentsLoading={isLoading}
        videoId="a90654b5-e855-4df6-914f-26873e89e4d6"
      />
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
