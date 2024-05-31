'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { useFeedbackModal } from '@/hooks/modal/use-feedback-modal'
import { useEffect, useState } from 'react'

export const FeedbackButton = () => {
  const [isMounted, setIsMounted] = useState(false)
  const { onOpen } = useFeedbackModal()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Button onClick={onOpen} variant="outline" className="gap-x-2 items-center">
      <Icons.bot className="w-4 h-4" />
      Recomendation
    </Button>
  )
}
