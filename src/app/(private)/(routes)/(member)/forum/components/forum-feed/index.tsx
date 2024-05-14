'use client'

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

  return (
    <ul className="flex flex-col col-span-2 space-y-6">
      {searchParams.get('category') !== 'All' &&
        pinnedPosts?.map(post => (
          <li key={post.id}>
            <Post
              post={post}
              userId={userId as string}
              commentAmount={post.comments.length}
              categoryName={post.category.name}
              likesAmount={post.likes.length}
              currentLike={!!post.likes.find(like => like.userId === userId)}
              isPinned
            />
          </li>
        ))}

      {allPosts.map((post: ExtendedPost, index: number) => {
        const currentLike = post.likes.find(like => like.userId === userId)

        if (index === allPosts.length - 1) {
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
          <Icons.loader className="w-6 h-6 text-zinc-500 animate-spin" />
        </li>
      )}
    </ul>
  )
}

export default ForumFeed
