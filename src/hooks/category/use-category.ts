import { api } from '@/lib/api'
import { type Category } from '@prisma/client'
import {
  useMutation,
  useQuery,
  type UseMutationOptions
} from '@tanstack/react-query'
import { type AxiosError, type AxiosResponse } from 'axios'

export const useCategory = () => {
  const { data: categories, isLoading: isLoadingCategories } = useQuery<
    Category[]
  >({
    queryKey: ['categories'],
    queryFn: async () => (await api.get(`/api/category`)).data
  })

  const useDeleteCategory = (
    categoryId: string,
    options?: UseMutationOptions<AxiosResponse<void>, AxiosError>
  ) =>
    useMutation({
      mutationFn: async () => {
        return await api.delete(`/api/category/${categoryId}`)
      },
      ...options
    })

  return { categories, isLoadingCategories, useDeleteCategory }
}
