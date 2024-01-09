'use client'

import { toast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  type ApproveOrDeclineContentBody,
  type NoficationApiProps
} from './types'

export const useNotification = () => {
  const { mutateAsync: approveOrDeclineContent, isPending } = useMutation({
    mutationKey: ['approveOrDeclineContent'],
    mutationFn: async (body: ApproveOrDeclineContentBody) => {
      await api.put(`/api/notification`, body)
    },
    onError: () => {
      toast({
        title: 'Something went wrong on course approval',
        description: 'Please try again later.',
        variant: 'destructive'
      })
    }
  })

  const { data: notifications, isLoading: isLoadingNotifications } =
    useQuery<NoficationApiProps>({
      queryKey: ['notifications'],
      queryFn: async () => {
        const { data } = await api.get<NoficationApiProps>('/api/notification')
        return data
      }
    })

  return {
    notifications,
    isLoadingNotifications,
    approveOrDeclineContent,
    isPending
  }
}
