'use client'

import { toast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { type Interest } from '@prisma/client'
import { useQuery, useMutation } from '@tanstack/react-query'
import { AxiosError, type AxiosResponse } from 'axios'

export const useFollowersAndFollowings = (userId: string) => {
  const {
    data: followers = [],
    isLoading: isLoadingFollowers,
    refetch: refetchFollowers
  } = useQuery<Interest[], AxiosError>({
    queryKey: ['followers', userId],
    queryFn: async () => {
      try {
        const response = await api.get(`/api/user/${userId}/followers`)
        return response.data.users
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error('Error fetching followers:', error)
          toast({
            title: 'Error',
            description: 'Failed to load followers.',
            variant: 'destructive'
          })
        }
        throw error
      }
    }
  })
  const { mutateAsync: follow, isPending: following } = useMutation<
    AxiosResponse<void>,
    AxiosError,
    string
  >({
    mutationKey: ['follow'],
    mutationFn: async () => {
      return await api.patch(`/api/user/follow`, { targetId: userId })
    },
    onSuccess: async () => {
      toast({ title: 'User followed successfully!' })
      await refetchFollowers()
    },
    onError: (error: AxiosError) => {
      console.error('Error following user:', error)
      toast({
        title: 'Error',
        description: 'Failed to follow user.',
        variant: 'destructive'
      })
    }
  })

  const { mutateAsync: unfollow, isPending: unfollowing } = useMutation<
    AxiosResponse<void>,
    AxiosError,
    string
  >({
    mutationKey: ['unfollow'],
    mutationFn: async () => {
      return await api.patch(`/api/user/unfollow`, { targetId: userId })
    },
    onSuccess: async () => {
      toast({ title: 'User unfollowed successfully!' })
      await refetchFollowers()
    },
    onError: (error: AxiosError) => {
      console.error('Error unfollowing user:', error)
      toast({
        title: 'Error',
        description: 'Failed to unfollow user.',
        variant: 'destructive'
      })
    }
  })
  return {
    followers,
    isLoadingFollowers,
    following,
    refetchFollowers,
    unfollowing,
    follow,
    unfollow
  }
}
