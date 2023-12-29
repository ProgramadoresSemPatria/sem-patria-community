'use client'

import { toast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useApproveOrDeclineCourseMutation = ({
  courseId,
  type
}: {
  courseId: string
  type: 'approve' | 'decline'
}) => {
  return useMutation({
    mutationKey: ['approveCourse'],
    mutationFn: async () => {
      await api.put(`/api/courses/pending?type=${type}&courseId=${courseId}`)
    },
    onSuccess: () => {
      if (type === 'approve') {
        toast({
          title: 'Course was approved with success',
          description: 'It can now be seen by the community.'
        })
      } else {
        toast({
          title: 'Course was declined',
          description: 'The course request will be deleted.',
          variant: 'destructive'
        })
      }
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
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data } = await api.get('/api/courses/pending')
      return data
    }
  })
}
