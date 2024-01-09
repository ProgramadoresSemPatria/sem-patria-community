import { api } from '@/lib/api'
import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { type AxiosError, type AxiosResponse } from 'axios'
import { type CreateCourseBody } from './type'

export const useCourse = () => {
  const useCreateCourse = (
    options?: UseMutationOptions<
      AxiosResponse<void>,
      AxiosError,
      CreateCourseBody
    >
  ) =>
    useMutation({
      mutationFn: async (body: CreateCourseBody) => {
        return await api.post(`/api/course`, body)
      },
      ...options
    })

  return { useCreateCourse }
}
