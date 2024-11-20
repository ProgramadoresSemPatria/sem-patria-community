'use client'

import { toast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { type Interest } from '@prisma/client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, type AxiosResponse } from 'axios'

export const useInterest = (userId: string) => {
  const queryClient = useQueryClient()
  const {
    data: interests = [],
    isLoading: isLoadingInterests,
    isError: isErrorInterests,
    refetch: refetchInterests
  } = useQuery<Interest[], AxiosError>({
    queryKey: ['interests', userId],
    queryFn: async () => {
      try {
        const response = await api.get(`/api/interest/user/${userId}`)
        return response.data
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error('Error fetching interests:', error)
          toast({
            title: 'Error',
            description: 'Failed to load interests.',
            variant: 'destructive'
          })
        }
        throw error
      }
    }
  })
  const { mutateAsync: addInterest, isPending: isAddingInterest } = useMutation<
    AxiosResponse<void>,
    AxiosError,
    string
  >({
    mutationKey: ['add-interest'],
    mutationFn: async (interestId: string) => {
      return await api.post(`/api/interest/${interestId}/${userId}`)
    },
    onSuccess: async () => {
      toast({ title: 'Interest added successfully!' })
      await queryClient.refetchQueries({ queryKey: ['interests', userId] })
    },
    onError: (error: AxiosError) => {
      console.error('Error adding interest:', error)
      toast({
        title: 'Error',
        description: 'Failed to add interest.',
        variant: 'destructive'
      })
    }
  })

  const { mutateAsync: removeInterest, isPending: isRemovingInterest } =
    useMutation<AxiosResponse<void>, AxiosError, string>({
      mutationKey: ['remove-interest'],
      mutationFn: async (interestId: string) => {
        return await api.patch(`/api/interest/${interestId}/${userId}`)
      },
      onSuccess: async () => {
        toast({ title: 'Interest removed successfully!' })
        await queryClient.refetchQueries({ queryKey: ['interests', userId] })
      },
      onError: (error: AxiosError) => {
        console.error('Error removing interest:', error)
        toast({
          title: 'Error',
          description: 'Failed to remove interest.',
          variant: 'destructive'
        })
      }
    })

  return {
    interests,
    isLoadingInterests,
    isErrorInterests,
    refetchInterests,
    addInterest,
    isAddingInterest,
    removeInterest,
    isRemovingInterest
  }
}
