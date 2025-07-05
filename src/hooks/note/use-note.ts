import { api } from '@/lib/api'
import { type Note } from '@prisma/client'
import {
  useMutation,
  useQuery,
  UseQueryOptions,
  type UseMutationOptions
} from '@tanstack/react-query'
import { type AxiosError, type AxiosResponse } from 'axios'
import { GetNotesDates, type SaveChangesNoteBody } from './types'

export const useNote = () => {
  const useCreateNewNote = (options?: UseMutationOptions<Note, AxiosError>) =>
    useMutation({
      mutationFn: async () => {
        const { data } = await api.post<Note>(`/api/note`)
        return data
      },
      ...options
    })

  const useSaveChangesNote = (
    noteId: string,
    options?: UseMutationOptions<void, AxiosError, SaveChangesNoteBody>
  ) =>
    useMutation({
      mutationFn: async (body: SaveChangesNoteBody) => {
        await api.put<Note>(`/api/note/${noteId}`, body)
      },
      ...options
    })

  const useDeleteNote = (
    noteId: string,
    options?: UseMutationOptions<AxiosResponse<void>, AxiosError>
  ) =>
    useMutation({
      mutationFn: async () => {
        return await api.delete(`/api/note/${noteId}`)
      },
      ...options
    })

  const useGetUserNotes = (
    options?: UseQueryOptions<GetNotesDates, AxiosError>
  ) =>
    useQuery({
      queryKey: ['getUserNotes'],
      queryFn: async () => {
        const response = await api.get<string[]>('/api/note')
        return { data: response.data }
      },
      ...options
    })

  return {
    useCreateNewNote,
    useSaveChangesNote,
    useDeleteNote,
    useGetUserNotes
  }
}
