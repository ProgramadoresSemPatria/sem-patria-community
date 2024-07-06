'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { type ExtendedComment } from '../page'
import { usePostComments } from './use-post-comments'

interface PostCommentsLinkProps {
  comments: ExtendedComment[]
  postId: string
}

const PostCommentsLink = ({ comments, postId }: PostCommentsLinkProps) => {
  const { commentsData } = usePostComments({
    comments,
    postId
  })

  return (
    <div
      className="flex items-center w-fit space-x-1 font-bold text-slate-600 text-sm"
      onClick={() => {
        const commentsElement = document.querySelector('#comments')
        commentsElement?.scrollIntoView({ behavior: 'smooth' })
      }}
    >
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-white dark:hover:bg-transparent rounded-full"
      >
        <Icons.forum className="h-5 dark:hover:text-white" strokeWidth={2} />
      </Button>
      <p className="leading-4">{commentsData.length}</p>
    </div>
  )
}

export default PostCommentsLink
