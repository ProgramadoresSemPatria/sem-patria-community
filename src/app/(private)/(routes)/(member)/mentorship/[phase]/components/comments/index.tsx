'use client'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@clerk/nextjs'
import { format } from 'date-fns'
import { useState } from 'react'

const commentsArray = [
  {
    id: 1,
    username: 'John Doe',
    comment: 'This is a comment',
    date: '2021-10-10',
    likes: ['user_2ZxbOCJzJkhbkpHfj1IYXxEQS1Y']
  },
  {
    id: 2,
    username: 'Jane Doe',
    comment: 'This is a medium comment',
    date: '2021-10-11',
    likes: []
  },
  {
    id: 3,
    username: 'Patrick Doe',
    comment: 'This is a long comment',
    date: '2021-10-12',
    likes: []
  }
]

export const Comments = () => {
  const { userId } = useAuth()
  const [orderBy, setOrderBy] = useState('recent')

  console.log(userId)

  return (
    <div className="mx-2 w-auto ring-1 ring-slate-800 rounded-md p-6 flex flex-col">
      <div className="flex gap-4 items-center mb-6">
        <h1 className="font-semibold text-xl">
          {commentsArray.length} Comments{' '}
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Icons.arrowUpDown className="h-4" />
              Order by
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32">
            <DropdownMenuRadioGroup value={orderBy} onValueChange={setOrderBy}>
              <DropdownMenuRadioItem value="recent">
                Most Recent
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="upvotes">
                Most Upvotes
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-4">
        {commentsArray.map(comment => (
          <div
            key={comment.id}
            className="border-b last:border-none border-slate-900 rounded-md p-4"
          >
            <div className="flex justify-between">
              <div className="flex gap-2 items-center ">
                <h2 className="font-semibold text-lg text-slate-300">
                  {comment.username}
                </h2>
                <p className="text-xs text-slate-500">
                  {format(new Date(comment.date), 'dd/MM/yyy')}
                </p>
              </div>
              {/* Admin Actions */}
              <div className="flex gap-2 items-center ">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full group"
                >
                  <Icons.trash
                    className="h-5 transition-colors text-slate-600 group-hover:text-white"
                    strokeWidth={2}
                  />
                </Button>
              </div>
            </div>
            <p className="text-sm">{comment.comment}</p>
            <div className="flex items-center w-fit space-x-1 mt-2 font-bold text-slate-600 text-sm">
              <Button
                variant="ghost"
                size="icon"
                className="group rounded-full "
              >
                <Icons.upVote
                  data-userliked={comment.likes.includes(userId ?? '')}
                  className="h-5 data-[userliked=true]:text-violet-900 group-hover:text-white "
                  strokeWidth={2}
                />
              </Button>
              <p
                data-userliked={comment.likes.includes(userId ?? '')}
                className="leading-4 data-[userliked=true]:text-violet-900"
              >
                {comment.likes.length}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
