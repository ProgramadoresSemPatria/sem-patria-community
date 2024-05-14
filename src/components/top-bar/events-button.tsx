'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { useEventModal } from '@/hooks/modal/use-event-modal'
import { useEffect, useState } from 'react'

export const EventsButton = () => {
  const [isMounted, setIsMounted] = useState(false)
  const { onOpen } = useEventModal()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Button onClick={onOpen} variant="ghost" size="icon">
      <Icons.calendarDays className="w-5 h-5" />
    </Button>
  )
}
