'use client'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Can } from '@/hooks/use-ability'
import { usePermissionModal } from '@/hooks/modal/use-modal'
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
  const { onOpen: openPermissionModal } = usePermissionModal()

  const renderLikeButton = (
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
    disabled?: boolean
  ) => (
    <div className="flex ml-2 items-center w-fit space-x-1 font-bold transition-colors dark:text-white text-black text-sm">
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        disabled={disabled}
        className={cn(
          'flex items-center gap-x-2 hover:bg-transparent hover:text-accent',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <Icons.upVote
          data-userliked={likeState.liked}
          data-ispostpage={isPostPage}
          className={cn(
            likeState.liked && 'text-primary',
            'data-[ispostpage=true]:h-5 data-[ispostpage=true]:w-5 h-4 w-4'
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

  return (
    <>
      <Can I="like" a="Post">
        {renderLikeButton(handleLike)}
      </Can>
      <Can not I="like" a="Post">
        {renderLikeButton(e => {
          e.stopPropagation()
          openPermissionModal()
        }, true)}
      </Can>
    </>
  )
}

export default PostLike
