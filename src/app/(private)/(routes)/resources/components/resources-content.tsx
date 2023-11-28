'use client'
import NavOptions from '@/components/nav-options'
import { resourcesOptions } from '@/lib/constants'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const ResourcesContent = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (!searchParams.get('filter')) {
      router.push(`${pathname}?filter=all`)
    }
  }, [])

  return (
    <div className="mt-6">
      <NavOptions options={resourcesOptions} />
    </div>
  )
}

export default ResourcesContent
