'use client'
import { Icons } from '@/components/icons'
import { Button, type ButtonVariantProps } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useNotifications } from '@/hooks/notifications/use-notifications'
import { useCallback } from 'react'

interface ControlButtonProps {
  type: 'approve' | 'reject'
  courseId: string
  categoryId: string
}

const ControlButton = ({ type, courseId, categoryId }: ControlButtonProps) => {
  const { approveOrDeclineContent, isPending } = useNotifications()

  const variants = {
    approve: {
      variant: null,
      style: 'bg-green-600 text-white hover:bg-green-700',
      title: 'Approve'
    },
    reject: {
      variant: 'destructive',
      style: '',
      title: 'Decline'
    }
  }

  const handleApproveOrDecline = useCallback(async () => {
    try {
      await approveOrDeclineContent({ courseId, categoryId, type })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    }
  }, [approveOrDeclineContent, categoryId, courseId, type])

  return (
    <Button
      variant={variants[type].variant as ButtonVariantProps}
      className={`${variants[type].style} gap-2`}
      onClick={handleApproveOrDecline}
    >
      {variants[type].title}
      {isPending && <Icons.loader className="animate-spin w-4 h-4 " />}
    </Button>
  )
}

export default ControlButton
