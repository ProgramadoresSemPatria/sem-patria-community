'use client'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { type ExtendedPost } from '@/lib/types'
import { cn } from '@/lib/utils'
import { usePostLikes } from './use-post-likes'

interface PostLikeProps {
  post: ExtendedPost
  loggedInUserId: string
  isPostPage?: boolean
}
const PostLike = ({
  loggedInUserId,
  post,
  isPostPage = false
}: PostLikeProps) => {
  const { handleLike, likeState } = usePostLikes({
    post,
    loggedInUserId
  })

  return (
    <div className="flex ml-2 items-center w-fit space-x-1 font-bold transition-colors dark:text-white text-black text-sm">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleLike}
        className="flex items-center gap-x-2 hover:bg-transparent hover:text-accent"
      >
        <Icons.upVote
          data-userliked={likeState.liked}
          data-ispostpage={isPostPage}
          className={cn(
            likeState.liked && 'text-primary',
            'data-[ispostpage=true]:h-5 data-[ispostpage=true]:w-5 h-4 w-4 '
          )}
        />

        <span
          data-userliked={likeState.liked}
          className="data-[userliked=true]:text-primary font-semibold text-sm"
        >
          {likeState.likes}
        </span>
      </Button>
    </div>
  )
}

export default PostLike
