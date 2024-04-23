'use client'

import { api } from '@/lib/api'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { usePostStore } from './use-post-store'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { useIntersection } from '@mantine/hooks'
import { type ExtendedPost } from '@/lib/types'

export const usePostContent = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { setPostList } = usePostStore()
  const categoryName = searchParams.get('category')

  const lastPostRef = useRef<HTMLElement>(null)

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1
  })

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['infinite-posts', { categoryName }],
    queryFn: async ({ pageParam = 1 }) => {
      const query =
        `/api/posts?limit=5&page=${pageParam}` +
        (categoryName ? `&category=${encodeURIComponent(categoryName)}` : '')
      const response = await api.get(query)
      console.log('response data query', response.data)
      return response.data
    },
    getNextPageParam: (_, allPages) => {
      return allPages.length + 1
    },
    // initialData: {
    //   pages: [initialPosts],
    //   pageParams: [undefined]
    // },
    initialPageParam: 1
  })

  useEffect(() => {
    if (entry?.isIntersecting) {
      void fetchNextPage()
    }
  }, [entry, fetchNextPage])

  useEffect(() => {
    if (data) setPostList(data as unknown as ExtendedPost[])
  }, [data, setPostList])

  useEffect(() => {
    if (!searchParams.get('category')) {
      router.push(`${pathname}?category=all`)
    }
  }, [pathname, router, searchParams])
  return { pathname, searchParams, isFetchingNextPage, ref, data }
}
