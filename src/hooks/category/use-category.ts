import { api } from '@/lib/api'
import { type Category } from '@prisma/client'
import {
  useMutation,
  useQuery,
  type UseMutationOptions
} from '@tanstack/react-query'
import { type AxiosError, type AxiosResponse } from 'axios'
import { type CreateCourseBody } from './types'

export const useCategory = () => {
  const { data: categories, isLoading: isLoadingCategories } = useQuery<
    Category[]
  >({
    queryKey: ['categories'],
    queryFn: async () => (await api.get(`/api/categories`)).data
  })

  const useCreateCourse = (
    options?: UseMutationOptions<
      AxiosResponse<void>,
      AxiosError,
      CreateCourseBody
    >
  ) =>
    useMutation({
      mutationFn: async (body: CreateCourseBody) => {
        return await api.post(`/api/courses`, body)
      },
      ...options
    })

  return { categories, isLoadingCategories, useCreateCourse }
}
