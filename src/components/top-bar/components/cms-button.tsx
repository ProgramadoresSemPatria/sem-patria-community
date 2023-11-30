'use client'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/hooks/use-app-store'
import React from 'react'

export const CMSButton = () => {
  const { isCmsMode, setCmsMode } = useAppStore()

  return (
    <Button
      onClick={() => setCmsMode(!isCmsMode)}
      variant="outline"
      className="gap-x-2 items-center"
    >
      <Icons.globe className="w-4 h-4" />
      {isCmsMode ? 'Member Mode' : 'CMS Mode'}
    </Button>
  )
}
