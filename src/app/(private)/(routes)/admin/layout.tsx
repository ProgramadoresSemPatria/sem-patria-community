'use client'

import { useAppStore } from '@/hooks/use-app-store'
import { appRoutes } from '@/lib/constants'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { isCmsMode } = useAppStore()
  const router = useRouter()

  useEffect(() => {
    if (!isCmsMode) return router.push(appRoutes.dashboard)
  }, [isCmsMode])

  return <>{children}</>
}
