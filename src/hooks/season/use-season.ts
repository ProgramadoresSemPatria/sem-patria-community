import type { SearchUsersInCurrentSeasonResponse } from '@/actions/leaderboard/get-leaderboard-users'
import { api } from '@/lib/api'
import {
  type UseQueryOptions,
  useInfiniteQuery,
  useQuery
} from '@tanstack/react-query'
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

  const useInfiniteLeaderboardUsers = (
    searchTerm: string,
    pageSize: number = 10,
    options?: unknown
  ) =>
    useInfiniteQuery({
      queryKey: ['infiniteLeaderboardUsers', searchTerm],
      queryFn: async ({ pageParam = 0 }) => {
        const response = await api.get<SearchLeaderboardUsersApiProps>(
          `/api/season/current/scoreboard?search=${encodeURIComponent(
            searchTerm
          )}&page=${pageParam}&pageSize=${pageSize}`
        )
        return response.data
      },
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.users.length < pageSize) return undefined
        return allPages.length
      },
      initialPageParam: 0,
      ...(options as Record<string, unknown>)
    })

  const useSearchUsersInCurrentSeason = (
    searchTerm: string,
    options?: UseQueryOptions<SearchUsersInCurrentSeasonResponse, AxiosError>
  ) =>
    useQuery({
      queryKey: ['searchUsersInCurrentSeason', searchTerm],
      queryFn: async () => {
        const response = await api.get<SearchUsersInCurrentSeasonResponse>(
          `/api/season/current/scoreboard/users?search=${encodeURIComponent(
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
    useInfiniteLeaderboardUsers,
    useSearchUsersInCurrentSeason
  }
}
