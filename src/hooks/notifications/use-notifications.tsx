'use client'

import { toast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { type NoficationsApiProps } from './types'

type ApproveOrDeclineContentBody = {
  courseId?: string
  categoryId?: string
  type: 'approve' | 'reject'
}

export const useApproveOrDeclineContentMutation = () => {
  return useMutation({
    mutationKey: ['approveContent'],
    mutationFn: async (body: ApproveOrDeclineContentBody) => {
      await api.put(`/api/notification`, body)
    },
    onSuccess: () => {
      toast({
        title: 'Content was approved with success',
        description: 'It can now be seen by the community.'
      })
    },
    onError: () => {
      toast({
        title: 'Something went wrong on course approval',
        description: 'Please try again later.',
        variant: 'destructive'
      })
    }
  })
}

export const useNotifications = () => {
  const { data: notifications, isLoading: isLoadingNotifications } =
    useQuery<NoficationsApiProps>({
      queryKey: ['notifications'],
      queryFn: async () => {
        const { data } = await api.get<NoficationsApiProps>('/api/notification')
        return data
      }
    })
  return { notifications, isLoadingNotifications }
}
