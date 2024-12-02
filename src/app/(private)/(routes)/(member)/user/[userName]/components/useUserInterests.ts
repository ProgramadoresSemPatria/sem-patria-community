'use client'

import { toast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { useQuery, useMutation } from '@tanstack/react-query'
import { AxiosError, type AxiosResponse } from 'axios'
import { type InterestWithUsers } from '../../../interests/page'

export const useUserInterest = (userId: string) => {
  const {
    data: interests = [],
    isLoading: isLoadingInterests,
    isError: isErrorInterests,
    refetch: refetchInterests
  } = useQuery<InterestWithUsers[], AxiosError>({
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
      await refetchInterests()
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
        await refetchInterests()
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
