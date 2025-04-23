'use client'

import { toast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { type User } from '@prisma/client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError, type AxiosResponse } from 'axios'

export type Followers = Array<Pick<User, 'id' | 'imageUrl' | 'username'>>
export type Followings = Array<Pick<User, 'id' | 'imageUrl' | 'username'>>

export const useFollowersAndFollowings = (userId: string) => {
  const {
    data: followers = [],
    isLoading: isLoadingFollowers,
    refetch: refetchFollowers
  } = useQuery<Followers, AxiosError>({
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

  const { data: followedUsers = [], isLoading: isLoadingFollowedUsers } =
    useQuery<Followings, AxiosError>({
      queryKey: ['followings', userId],
      queryFn: async () => {
        try {
          const response = await api.get(`/api/user/${userId}/following`)
          return response.data.users
        } catch (error) {
          if (error instanceof AxiosError) {
            console.error('Error fetching followings:', error)
            toast({
              title: 'Error',
              description: 'Failed to load followings.',
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
    unfollow,
    followedUsers,
    isLoadingFollowedUsers
  }
}
