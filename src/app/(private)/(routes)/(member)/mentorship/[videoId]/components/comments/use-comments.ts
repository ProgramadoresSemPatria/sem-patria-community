import { api } from '@/lib/api'
import { type Video } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

export type CommentResponse = {
  id: string
  username: string
  userImage: string
  comment: string
  date: string
  likes: string[]
}

type UseCommentsProps = {
  videoProps: Video
}

export const useComments = ({ videoProps }: UseCommentsProps) => {
  const [orderBy, setOrderBy] = useState('recent')

  const {
    data: comments = [],
    isLoading,
    isFetching
  } = useQuery<CommentResponse[]>({
    queryKey: ['video-comments'],
    queryFn: async () => {
      const { data } = await api.get(`/api/comment/${videoProps.id}`)
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
  return {
    isLoading,
    isFetching,
    orderedComments,
    setOrderBy,
    comments,
    orderBy
  }
}
