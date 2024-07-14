import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { type ExtendedComment } from '../[...titleSlug]/page'

export function usePostComments({
  comments,
  postId
}: {
  comments?: ExtendedComment[]
  postId?: string
}) {
  const {
    data: commentsData,
    isFetching,
    refetch
  } = useQuery<ExtendedComment[]>({
    initialData: comments || [],
    queryKey: ['get-comments', postId],
    queryFn: async () => {
      const { data } = await api.get(`/api/post/${postId}/comments`)
      return data
    }
  })

  return {
    commentsData,
    isFetching,
    refetch
  }
}
