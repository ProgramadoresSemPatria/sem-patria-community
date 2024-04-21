'use client'

import { api } from '@/lib/api'
import { type ExtendedPost } from '@/lib/types'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect, useRef } from 'react'
import Post from './post'
import { Loader2 } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface ForumFeedProps {
  initialPosts: ExtendedPost[]
  userId?: string
}

const ForumFeed: React.FC<ForumFeedProps> = ({ initialPosts, userId }) => {
  const lastPostRef = useRef<HTMLElement>(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1
  })

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [
      'infinite-posts',
      {
        category: searchParams.get('category')
      }
    ],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get(`/api/post`, {
        params: {
          category: searchParams.get('category'),
          page: pageParam,
          limit: 10
        }
      })
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
      router.push(`${pathname}?category=All`)
    }
  }, [pathname, router, searchParams])

  const posts = data?.pages.flatMap(page => page) ?? initialPosts

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
