'use client'

import { api } from '@/lib/api'
import { Course } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useCourseContent = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { data: coursesList, isLoading } = useQuery<AxiosResponse<Course[]>>({
    queryKey: ['courses', { filter: searchParams.get('filter') }],
    queryFn: () => api.get(`/api/courses?filter=${searchParams.get('filter')}`),
    enabled: !!searchParams.get('filter')
  })

  useEffect(() => {
    if (!searchParams.get('filter')) {
      router.push(`${pathname}?filter=all`)
    }
  }, [])

  return { pathname, searchParams, isLoading, coursesList }
}
