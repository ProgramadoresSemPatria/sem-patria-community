import { RichTextInput } from '@/components/rich-text-input'
import { useMemo, useState } from 'react'
import { CommentComponent } from './comment-component'
import { OrderBy } from './order-by'

export interface Comment {
  id: string
  username: string
  userImg: string
  comment: string
  date: string
  likes: string[]
}

const commentsArray = [
  {
    id: '1',
    username: 'John Doe',
    userImg:
      'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ2l0aHViL2ltZ18yWnhiT0FSY000WmdyUVVqQVdmT2RhTG1zeWQifQ',
    comment: 'This is a comment',
    date: '2024-02-25',
    likes: ['user_2ZxbOCJzJkhbkpHfj1IYXxEQS1Y']
  },
  {
    id: '2',
    username: 'Jane Doe',
    userImg:
      'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ2l0aHViL2ltZ18yWnhiT0FSY000WmdyUVVqQVdmT2RhTG1zeWQifQ',
    comment: 'This is a medium comment',
    date: '2024-02-26 12:00:00',
    likes: []
  },
  {
    id: '3',
    username: 'Patrick Doe',
    userImg:
      'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ2l0aHViL2ltZ18yWnhiT0FSY000WmdyUVVqQVdmT2RhTG1zeWQifQ',
    comment: 'This is a long comment',
    date: '2024-01-10',
    likes: []
  }
]

export const Comments = () => {
  const [orderBy, setOrderBy] = useState('recent')

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
        <OrderBy orderByValue={orderBy} setOrderByValue={setOrderBy} />
      </div>
      <RichTextInput />
      <div className="flex flex-col gap-4">
        {orderedComments.map(comment => (
          <CommentComponent key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}
