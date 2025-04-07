import { getCurrentSeason } from '@/actions/leaderboard/get-current-season'
import type { CurrentSeasonResponse } from '@/actions/leaderboard/types'
import { api } from '@/lib/api'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { GetAllSeasonsApiProps, GetCurrentSeasonApiProps } from './types'

export const useSeason = () => {
  const useGetCurrentSeasonApi = (
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

  const useGetCurrentSeasonServer = (
    options?: UseQueryOptions<CurrentSeasonResponse, AxiosError>
  ) =>
    useQuery({
      queryKey: ['getCurrentSeasonServer'],
      queryFn: async () => await getCurrentSeason(),
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

  return {
    useGetCurrentSeasonApi,
    useGetCurrentSeasonServer,
    useGetAllSeasons
  }
}
