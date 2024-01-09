'use client'

import { api } from '@/lib/api'
import { type Course } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const useCourseContent = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { data: coursesList, isLoading } = useQuery<Course[]>({
    queryKey: ['courses', { filter: searchParams.get('filter') }],
    queryFn: async () =>
      (await api.get(`/api/course?filter=${searchParams.get('filter')}`)).data,
    enabled: !!searchParams.get('filter')
  })

  useEffect(() => {
    if (!searchParams.get('filter')) {
      router.push(`${pathname}?filter=all`)
    }
  }, [pathname, router, searchParams])

  return { pathname, searchParams, isLoading, coursesList }
}
