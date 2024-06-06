'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { useFeedbackModal } from '@/hooks/modal/use-feedback-modal'
import { useEffect, useState } from 'react'

type FeedbackButtonProps = {
  isMobile?: boolean
}

export const FeedbackButton = ({ isMobile }: FeedbackButtonProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const { onOpen } = useFeedbackModal()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Button
      onClick={onOpen}
      size={isMobile ? 'icon' : 'default'}
      variant='outline'
      className="gap-x-2 items-center"
    >
      {!isMobile && "Recommendation"}
      <Icons.bot className="h-5 w-5" />
    </Button>
  )
}
