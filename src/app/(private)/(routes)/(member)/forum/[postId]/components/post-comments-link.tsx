'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'

interface PostCommentsLinkProps {
  commentsLength: number
}

const PostCommentsLink = ({ commentsLength }: PostCommentsLinkProps) => {
  return (
    <div
      className="flex items-center w-fit space-x-1 font-bold text-slate-600 text-sm"
      onClick={() => {
        const commentsElement = document.querySelector('#comments')
        commentsElement?.scrollIntoView({ behavior: 'smooth' })
      }}
    >
      <Button variant="ghost" size="icon" className="group rounded-full">
        <Icons.forum className="h-5 group-hover:text-white " strokeWidth={2} />
      </Button>
      <p className="leading-4">{commentsLength}</p>
    </div>
  )
}

export default PostCommentsLink
