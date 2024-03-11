'use client'

import { api } from '@/lib/api'
import { type Course } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useCourseStore } from './use-course-store'

export const useCourseContent = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { setCourseList } = useCourseStore()

  const { data, isLoading } = useQuery<Course[]>({
    queryKey: [
      'courses',
      {
        category: searchParams.get('category'),
        level: searchParams.get('level'),
        availability: searchParams.get('availability')
      }
    ],
    queryFn: async () =>
      (
        await api.get(`/api/course`, {
          params: {
            category: searchParams.get('category'),
            level: searchParams.get('level'),
            availability: searchParams.get('availability')
          }
        })
      ).data,
    enabled: !!searchParams.get('category')
  })

  useEffect(() => {
    if (data) setCourseList(data)
  }, [data, setCourseList])

  useEffect(() => {
    if (!searchParams.get('category')) {
      router.push(`${pathname}?category=all`)
    }
  }, [pathname, router, searchParams])

  return { pathname, searchParams, isLoading }
}
