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
    queryKey: ['courses', { category: searchParams.get('category') }],
    queryFn: async () =>
      (await api.get(`/api/course?category=${searchParams.get('category')}`))
        .data,
    enabled: !!searchParams.get('category')
  })

  useEffect(() => {
    if (!searchParams.get('category')) {
      router.push(`${pathname}?category=all`)
    }
  }, [pathname, router, searchParams])

  return { pathname, searchParams, isLoading, coursesList }
}
