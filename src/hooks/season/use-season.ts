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

  return {
    useGetCurrentSeason,
    useGetAllSeasons,
    useSearchLeaderboardUsers,
    useInfiniteLeaderboardUsers
  }
}
