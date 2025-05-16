'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { type ExtendedPost } from '@/lib/types'
import { useMemo } from 'react'
import Post from '../post'
import { useForumFeed } from './use-forum-feed'

type ForumFeedProps = {
  initialPosts: ExtendedPost[]
  userId?: string
}

const ForumFeed = ({ initialPosts, userId }: ForumFeedProps) => {
  const {
    pinnedPosts,
    ref,
    searchParams,
    allPosts,
    filteredPosts,
    isFetchingNextPage
  } = useForumFeed({ initialPosts })

  const searchTerm = searchParams.get('search')

  const topPosts = useMemo(() => {
    if (searchParams.get('category') === 'All' && !searchTerm) {
      return [...initialPosts]
        .filter(post => post.likes.length > 0)
        .sort((a, b) => b.likes.length - a.likes.length)
        .slice(0, 3)
    }
    return []
  }, [initialPosts, searchParams, searchTerm])

  const postsToRender = useMemo(() => {
    const posts = searchTerm ? filteredPosts : allPosts
    return posts.filter(post => {
      const isInTopPosts =
        searchParams.get('category') === 'All' &&
        topPosts.some(topPost => topPost.id === post.id)

      const isPinnedInNonAllCategory =
        searchParams.get('category') !== 'All' && post.isPinned

      return !isInTopPosts && !isPinnedInNonAllCategory
    })
  }, [searchTerm, filteredPosts, allPosts, topPosts, searchParams])

  return (
    <ul className="flex flex-col col-span-2 space-y-6">
      {!searchTerm &&
        searchParams.get('category') === 'All' &&
        topPosts.map(post => (
          <li key={post.id}>
            <Post
              post={post}
              userId={userId as string}
              commentAmount={post.comments.length}
              categoryName={post.category.name}
              likesAmount={post.likes.length}
              currentLike={!!post.likes.find(like => like.userId === userId)}
              isPinned={true}
            />
          </li>
        ))}

      {!searchTerm &&
        searchParams.get('category') !== 'All' &&
        pinnedPosts?.map(post => (
          <li key={post.id}>
            <Post
              post={post}
              userId={userId as string}
              commentAmount={post.comments.length}
              categoryName={post.category.name}
              likesAmount={post.likes.length}
              currentLike={!!post.likes.find(like => like.userId === userId)}
              isPinned={post.isPinned as boolean}
            />
          </li>
        ))}

      {postsToRender.map((post: ExtendedPost, index: number) => {
        if (!post) {
          return null
        }

        const currentLike = post?.likes?.find(like => like.userId === userId)

        if (index === postsToRender.length - 1) {
          return (
            <li key={post.id} ref={ref}>
              <Post
                userId={userId as string}
                commentAmount={post?.comments?.length || 0}
                post={post}
                categoryName={post?.category?.name || ''}
                likesAmount={post?.likes?.length || 0}
                currentLike={!!currentLike}
              />
            </li>
          )
        } else {
          return (
            <Post
              userId={userId as string}
              key={post.id}
              commentAmount={post?.comments?.length || 0}
              post={post}
              categoryName={post?.category?.name || ''}
              likesAmount={post?.likes?.length || 0}
              currentLike={!!currentLike}
            />
          )
        }
      })}
      {isFetchingNextPage &&
        Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-md shadow hover:cursor-pointer bg-card"
          >
            <div className="px-6 py-4 flex flex-col gap-4 justify-between">
              <div className="flex items-center">
                <Skeleton className="rounded-full w-8 h-8" />
                <div className="flex flex-col ml-1 gap-2">
                  <Skeleton className="h-3 w-14" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-8 w-full rounded-md" />
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        ))}
    </ul>
  )
}

export default ForumFeed
