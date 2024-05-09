'use client'

import avatarImg from '@/assets/avatar.png'
import NoteEditor from '@/components/editor/editor'
import { Icons } from '@/components/icons'
import { Can } from '@/hooks/use-ability'
import { type ExtendedPost } from '@/lib/types'
import { getStringFromDate } from '@/lib/utils'
import { MessageSquare } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type FC } from 'react'
import { PostActions } from './post-actions'
import PostLike from './post-likes'

interface PostProps {
  post: ExtendedPost
  likesAmount: number
  categoryName: string
  currentLike?: boolean
  commentAmount: number
  userId: string
  isPinned?: boolean
}

const Post: FC<PostProps> = ({
  post,
  likesAmount: _likesAmount,
  currentLike: _currentLike,
  categoryName,
  commentAmount,
  userId,
  isPinned
}) => {
  const router = useRouter()

  return (
    <div
      onClick={e => {
        router.push(`/forum/${post.id}`)
      }}
      className={`rounded-md bg-slate-900 shadow text-white hover:cursor-pointer ${
        isPinned && post.isPinned ? 'border-l-2 border-l-orange-600' : ''
      }`}
    >
      <div className="px-6 py-4 flex justify-between">
        <div className="w-0 flex-1">
          <div className="flex items-center max-h-40 text-gray-300">
            <Image
              className="rounded-full w-8"
              alt=""
              width={500}
              height={500}
              src={(post.user.imageUrl as string) || avatarImg.src}
            />
            <div className="flex flex-col ml-2">
              <span className="font-bold text-base">{post.user.username}</span>
              <span className="text-xs">
                {getStringFromDate(post.createdAt.toString())} in{' '}
                <span
                  className="hover:cursor-pointer hover:underline"
                  onClick={e => {
                    e.stopPropagation()
                    router.push(`forum?category=${post.category.name}`)
                  }}
                >
                  {post.category.name}{' '}
                </span>
              </span>
            </div>
          </div>
          <div className="relative text-sm max-h-40 w-full mt-2 overflow-clip">
            <h1 className="font-bold text-2xl">{post.title}</h1>
            <NoteEditor
              initialValue={JSON.parse(post.content as string)}
              editable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 from-0% to-50% rounded-md shadow-lg" />
          </div>
        </div>
        <div className="flex gap-x-2 items-start">
          {post.isPinned && isPinned && (
            <Icons.pin className="my-1  text-orange-600 fill-orange-600 h-5 w-5" />
          )}
          <Can I="delete" a="Post">
            <PostActions post={post} />
          </Can>
        </div>
      </div>
      <div className="flex items-center">
        <PostLike
          initialVotesAmt={post.likes.length}
          post={post}
          userId={userId}
        />
        <div className="bg-slate-900 z-20 text-sm px-4 py-4 sm:px-6">
          <Link
            href={`/${categoryName}/post/${post.id}`}
            className="w-fit flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" /> {commentAmount} comments
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Post
