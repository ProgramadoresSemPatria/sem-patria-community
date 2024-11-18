'use client'

import { type ExtendedPost } from '@/lib/types'
import Post from '../../../forum/components/post'

const UserPosts = ({
  posts = [],
  userId
}: {
  posts: ExtendedPost[]
  userId: string
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Posts</h2>
      <div className="space-y-6">
        {posts.map(post => (
          <Post
            key={post.id}
            categoryName={post.category.name}
            commentAmount={post.comments.length}
            likesAmount={post.likes.length}
            post={post}
            userId={userId}
          />
        ))}
      </div>
    </div>
  )
}

export default UserPosts
