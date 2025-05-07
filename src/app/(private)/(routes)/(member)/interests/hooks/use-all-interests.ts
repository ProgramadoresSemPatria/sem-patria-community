import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { type InterestWithUsers } from '../page'
import { AxiosError } from 'axios'
import { toast } from '@/components/ui/use-toast'
import { type User } from '@prisma/client'

export const useAllInterests = (initialData?: InterestWithUsers[]) => {
  const queryClient = useQueryClient()

  const {
    data: interests = [],
    isLoading,
    isError,
    refetch
  } = useQuery<InterestWithUsers[], AxiosError>({
    queryKey: ['all-interests'],
    queryFn: async () => {
      try {
        const response = await api.get('/api/interest')
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
    },
    initialData
  })

  const updateInterestOptimistically = (
    interestId: string,
    userId: string,
    isAdding: boolean
  ) => {
    queryClient.setQueryData<InterestWithUsers[]>(['all-interests'], old => {
      if (!old) return old
      return old.map(interest => {
        if (interest.id === interestId) {
          const updatedUsers = isAdding
            ? // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
              [...interest.users, { id: userId } as User]
            : interest.users.filter(user => user.id !== userId)
          return { ...interest, users: updatedUsers }
        }
        return interest
      })
    })
  }

  return {
    interests,
    isLoading,
    isError,
    refetch,
    updateInterestOptimistically
  }
}
