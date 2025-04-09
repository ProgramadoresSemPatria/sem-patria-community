import { api } from '@/lib/api'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type {
  GetAllSeasonsApiProps,
  GetCurrentSeasonApiProps,
  SearchLeaderboardUsersApiProps
} from './types'

export const useSeason = () => {
  const useGetCurrentSeason = (
    options?: UseQueryOptions<GetCurrentSeasonApiProps, AxiosError>
  ) =>
    useQuery({
      queryKey: ['getCurrentSeason'],
      queryFn: async () => {
        const response =
          await api.get<GetCurrentSeasonApiProps>(`/api/season/current`)
        return response.data
      },
      ...options
    })

  const useGetAllSeasons = (
    options?: UseQueryOptions<GetAllSeasonsApiProps, AxiosError>
  ) =>
    useQuery({
      queryKey: ['getAllSeasons'],
      queryFn: async () => {
        const response = await api.get<GetAllSeasonsApiProps>(`/api/season`)
        return response.data
      },
      ...options
    })

  const useSearchLeaderboardUsers = (
    searchTerm: string,
    options?: UseQueryOptions<SearchLeaderboardUsersApiProps, AxiosError>
  ) =>
    useQuery({
      queryKey: ['searchLeaderboardUsers', searchTerm],
      queryFn: async () => {
        const response = await api.get<SearchLeaderboardUsersApiProps>(
          `/api/season/current/scoreboard?search=${encodeURIComponent(
            searchTerm
          )}`
        )
        return response.data
      },
      enabled: !!searchTerm && searchTerm.length >= 2,
      ...options
    })

  return {
    useGetCurrentSeason,
    useGetAllSeasons,
    useSearchLeaderboardUsers
  }
}
