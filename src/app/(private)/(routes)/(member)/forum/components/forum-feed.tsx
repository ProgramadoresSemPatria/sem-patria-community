'use client'

import { api } from '@/lib/api'
import { type ExtendedPost } from '@/lib/types'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect, useRef } from 'react'
import Post from './post'
import { Loader2 } from 'lucide-react'
import { usePostStore } from '@/hooks/post/use-post-store'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface ForumFeedProps {
  initialPosts: ExtendedPost[]
  categoryName?: string
  userId?: string
}

const ForumFeed: React.FC<ForumFeedProps> = ({
  initialPosts,
  categoryName,
  userId
}) => {
  // const { postList } = usePostStore()
  // console.log('postlist', postList)
  // const {} = usePostStore()
  const lastPostRef = useRef<HTMLElement>(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1
  })

  // const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
  //   queryKey: ['infinite-query', { categoryName }],
  //   queryFn: async ({ pageParam = 1 }) => {
  //     const query =
  //       `/api/posts/limit=${5}&page=${pageParam}` +
  //       (categoryName ? `&category=${categoryName}` : '')
  //     const { data } = await api.get(query)
  //     return data as ExtendedPost[]
  //   },
  //   getNextPageParam: (_, pages) => {
  //     return pages.length + 1
  //   },
  //   initialData: { pages: [initialPosts], pageParams: [1] }
  // })
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['infinite-posts', { categoryName }],
    queryFn: async ({ pageParam = 1 }) => {
      const query =
        `/api/posts?limit=5&page=${pageParam}` +
        (categoryName ? `&category=${encodeURIComponent(categoryName)}` : '')
      const response = await api.get(query)
      return response.data
    },
    getNextPageParam: (_, allPages) => {
      return allPages.length + 1
    },
    initialData: {
      pages: [initialPosts],
      pageParams: [1]
    },
    initialPageParam: 1
  })

  useEffect(() => {
    if (entry?.isIntersecting) {
      void fetchNextPage()
    }
  }, [entry, fetchNextPage])

  useEffect(() => {
    if (!searchParams.get('category')) {
      router.push(`${pathname}?category=all`)
    }
  }, [pathname, router, searchParams])

  const posts = data?.pages.flatMap(page => page) ?? initialPosts
  console.log('forum feed', data.pages)

  return (
    <ul className="flex flex-col col-span-2 space-y-6">
      {posts.map((post: ExtendedPost, index) => {

        const currentLike = post.likes.find(like => like.userId === userId)

        if (index === posts.length - 1) {
          return (
            <li key={post.id} ref={ref}>
              <Post
                userId={userId as string}
                commentAmount={post.comments.length}
                post={post}
                categoryName={post.category.name}
                likesAmount={post.likes.length}
                currentLike={!!currentLike}
              />
            </li>
          )
        } else {
          return (
            <Post
            userId={userId as string}
              key={post.id}
              commentAmount={post.comments.length}
              post={post}
              categoryName={post.category.name}
              likesAmount={post.likes.length}
              currentLike={!!currentLike}
            />
          )
        }
      })}
      {isFetchingNextPage && (
        <li className="flex justify-center">
          <Loader2 className="w-6 h-6 text-zinc-500 animate-spin" />
        </li>
      )}
    </ul>
  )
}

export default ForumFeed
