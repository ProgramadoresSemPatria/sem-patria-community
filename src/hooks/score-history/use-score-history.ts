import { api } from '@/lib/api'
import {
  useInfiniteQuery,
  useQuery,
  type UseInfiniteQueryOptions,
  type UseQueryOptions
} from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type {
  GetScoreHistoryBySeasonApiProps,
  GetScoreHistoryBySeasonProps,
  GetScoreHistoryByUserIdApiProps
} from './types'

export const useScoreHistory = () => {
  const useGetScoreHistoryByUserId = (
    userId: string,
    options?: UseQueryOptions<GetScoreHistoryByUserIdApiProps, AxiosError>
  ) =>
    useQuery({
      queryKey: ['getScoreHistoryByUserId', userId],
      queryFn: async () => {
        const response = await api.get<GetScoreHistoryByUserIdApiProps>(
          `/api/user/${userId}/scorehistory`
        )
        return response.data
      },
      ...options
    })

  const useGetScoreHistoryBySeason = (
    props: GetScoreHistoryBySeasonProps,
    options?: Partial<
      UseInfiniteQueryOptions<GetScoreHistoryBySeasonApiProps, AxiosError>
    >
  ) => {
    return useInfiniteQuery({
      queryKey: ['getScoreHistoryBySeason', props.seasonId],
      queryFn: async ({ pageParam }) => {
        const response = await api.get<GetScoreHistoryBySeasonApiProps>(
          `/api/season/${props.seasonId}/scorehistory`,
          {
            params: {
              cursor: pageParam,
              limit: props.limit
            }
          }
        )
        return response.data
      },
      initialPageParam: null,
      getNextPageParam: lastPage => lastPage.nextCursor || null,
      ...options
    })
  }

  return {
    useGetScoreHistoryByUserId,
    useGetScoreHistoryBySeason
  }
}
