'use client'

import React from 'react'
import { Icons } from '@/components/icons'
import { type ExtendedPost } from '@/lib/types'
import Post from '../post'
import { useForumFeed } from './use-forum-feed'

type ForumFeedProps = {
  initialPosts: ExtendedPost[]
  userId?: string
}

const ForumFeed = ({ initialPosts, userId }: ForumFeedProps) => {
  const { pinnedPosts, ref, searchParams, allPosts, isFetchingNextPage } =
    useForumFeed({ initialPosts })

  const topPosts = React.useMemo(() => {
    if (searchParams.get('category') === 'All') {
      return (allPosts || [])
        .filter(post => post && post.likes && post.likes.length > 0)
        .sort((a, b) => b.likes.length - a.likes.length)
        .slice(0, 3)
    }
    return []
  }, [allPosts, searchParams])
  return (
    <ul className="flex flex-col col-span-2 space-y-6">
      {searchParams.get('category') === 'All'
        ? topPosts.map(post => (
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
          ))
        : pinnedPosts?.map(post => (
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

      {allPosts.map((post: ExtendedPost, index: number) => {
        if (!post) {
          return null
        }

        const currentLike = post?.likes?.find(like => like.userId === userId)

        if (index === allPosts.length - 1) {
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
      {isFetchingNextPage && (
        <li className="flex justify-center">
          <Icons.loader className="w-6 h-6 text-zinc-500 animate-spin" />
        </li>
      )}
    </ul>
  )
}

export default ForumFeed
