'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { useEventModal } from '@/hooks/modal/use-event-modal'
import { useEffect, useState } from 'react'

type EventsButtonProps = {
  isMobile?: boolean
}

export const EventsButton = ({ isMobile }: EventsButtonProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const { onOpen } = useEventModal()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Button onClick={onOpen} variant="ghost" size="icon" className={isMobile ? 'mr-4' : undefined}>
      <Icons.calendarDays className="h-5 w-5" />
    </Button>
  )
}
