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
import Image from 'next/image'
import { useMemo, useState } from 'react'

const commentsArray = [
  {
    id: 1,
    username: 'John Doe',
    userImg:
      'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ2l0aHViL2ltZ18yWnhiT0FSY000WmdyUVVqQVdmT2RhTG1zeWQifQ',
    comment: 'This is a comment',
    date: '2024-02-25',
    likes: ['user_2ZxbOCJzJkhbkpHfj1IYXxEQS1Y']
  },
  {
    id: 2,
    username: 'Jane Doe',
    userImg:
      'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ2l0aHViL2ltZ18yWnhiT0FSY000WmdyUVVqQVdmT2RhTG1zeWQifQ',
    comment: 'This is a medium comment',
    date: '2024-02-26 12:00:00',
    likes: []
  },
  {
    id: 3,
    username: 'Patrick Doe',
    userImg:
      'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ2l0aHViL2ltZ18yWnhiT0FSY000WmdyUVVqQVdmT2RhTG1zeWQifQ',
    comment: 'This is a long comment',
    date: '2024-01-10',
    likes: []
  }
]
const orderByValues = [
  {
    value: 'recent',
    label: 'Most Recent'
  },
  {
    value: 'upvotes',
    label: 'Most Upvotes'
  }
]

export const Comments = () => {
  const { userId } = useAuth()
  const [orderBy, setOrderBy] = useState('recent')

  const getStringFromDate = (date: string) => {
    const commentDate = new Date(date)
    const todayDate = new Date()

    const diff = todayDate.getTime() - commentDate.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor(
      (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) / 60
    )

    if (days > 0) {
      if (days > 7) {
        return format(commentDate, 'dd/MM/yyyy')
      }
      return `${days} days ago`
    } else if (hours > 0) {
      return `${hours} hours ago`
    } else {
      return `${minutes} minutes ago`
    }
  }

  const orderedComments = useMemo(
    () =>
      commentsArray.sort((a, b) => {
        if (orderBy === 'recent') {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        }
        return b.likes.length - a.likes.length
      }),
    [orderBy]
  )

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
              {orderByValues.map(orderByValue => (
                <DropdownMenuRadioItem
                  key={orderByValue.value}
                  value={orderByValue.value}
                >
                  {orderByValue.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-4">
        {orderedComments.map(comment => (
          <div
            key={comment.id}
            className="border-b last:border-none border-slate-900 rounded-md p-4"
          >
            <div className="flex justify-between">
              <div className="flex gap-2 items-center mb-2">
                <>
                  <Image
                    className="rounded-full w-8 mr-1"
                    alt=""
                    width={500}
                    height={500}
                    src={comment.userImg}
                  />
                  <h2 className="font-semibold text-lg text-slate-300">
                    {comment.username}
                  </h2>
                </>
                <p className="text-xs text-slate-500">
                  {getStringFromDate(comment.date)}
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
