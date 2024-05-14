import { usePost } from '@/hooks/post/use-post'
import { type ExtendedPost } from '@/lib/types'
import type React from 'react'
import { useReducer } from 'react'

type UsePostLikesProps = {
  post: ExtendedPost
  userId: string
}

export const usePostLikes = ({ post, userId }: UsePostLikesProps) => {
  const { onLikePost } = usePost({ post })

  const [likeState, dispatch] = useReducer(
    (state: { likes: number; liked: boolean }, action: { type: string }) => {
      switch (action.type) {
        case 'LIKE':
          return { ...state, liked: true, likes: state.likes + 1 }
        case 'UNLIKE':
          return { ...state, liked: false, likes: state.likes - 1 }
        default:
          return state
      }
    },
    {
      liked: post.likes.some(
        like => like.userId === userId && like.postId === post.id
      ),
      likes: post.likes.length
    }
  )

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    try {
      dispatch({ type: likeState.liked ? 'UNLIKE' : 'LIKE' })
      await onLikePost()
    } catch (error) {
      dispatch({ type: likeState.liked ? 'LIKE' : 'UNLIKE' })
    }
  }
  return { handleLike, likeState }
}
