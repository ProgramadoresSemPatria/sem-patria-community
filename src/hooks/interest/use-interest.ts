import { api } from '@/lib/api'
import { type Interest } from '@prisma/client'
import {
  useMutation,
  useQuery,
  type UseMutationOptions
} from '@tanstack/react-query'
import { type AxiosError, type AxiosResponse } from 'axios'

export const useInterest = () => {
  const { data: interests, isLoading: isLoadingInterests } = useQuery<
    Interest[]
  >({
    queryKey: ['interests'],
    queryFn: async () => (await api.get(`/api/category`)).data
  })

  const useDeleteInterests = (
    interestId: string,
    options?: UseMutationOptions<AxiosResponse<void>, AxiosError>
  ) =>
    useMutation({
      mutationFn: async () => {
        return await api.delete(`/api/interest/${interestId}`)
      },
      ...options
    })

  return { interests, isLoadingInterests, useDeleteInterests }
}
