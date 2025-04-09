import { api } from '@/lib/api'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { GetScoreboardByUserIdApiProps } from './types'

export const useScoreboard = () => {
  const useGetScoreboardByUserId = (
    userId: string,
    options?: UseQueryOptions<GetScoreboardByUserIdApiProps, AxiosError>
  ) =>
    useQuery({
      queryKey: ['getScoreboardByUserId', userId],
      queryFn: async () => {
        const response = await api.get<GetScoreboardByUserIdApiProps>(
          `/api/user/${userId}/scoreboard`
        )
        return response.data
      },
      ...options
    })

  return {
    useGetScoreboardByUserId
  }
}
