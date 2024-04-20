'use client'

import { api } from '@/lib/api'
import { type Post } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { usePostStore } from './use-post-store'

export const usePostContent = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { setPostList } = usePostStore()

  const { data, isLoading } = useQuery<Post[]>({
    queryKey: [
      'posts',
      {
        category: searchParams.get('category')
      }
    ],
    queryFn: async () =>
      (
        await api.get(`/api/post`, {
          params: {
            category: searchParams.get('category')
          }
        })
      ).data,
    enabled: !!searchParams.get('category')
  })

  useEffect(() => {
    if (data) setPostList(data)
  }, [data, setPostList])

  useEffect(() => {
    if (!searchParams.get('category')) {
      router.push(`${pathname}?category=all`)
    }
  }, [pathname, router, searchParams])

  return { pathname, searchParams, isLoading }
}
