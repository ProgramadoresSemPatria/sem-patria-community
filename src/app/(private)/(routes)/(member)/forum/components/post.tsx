'use client'

import avatarImg from '@/assets/avatar.png'
import NoteEditor from '@/components/editor/editor'
import { Icons } from '@/components/icons'
import { Can } from '@/hooks/use-ability'
import { type ExtendedPost } from '@/lib/types'
import { cn, getStringFromDate } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, useRouter } from 'next/navigation'
import { PostActions } from './post-actions'
import PostLike from './post-likes'
import slugify from 'slugify'

type PostProps = {
  post: ExtendedPost
  likesAmount: number
  categoryName: string
  currentLike?: boolean
  commentAmount: number
  userId: string
  isPinned?: boolean
  actions?: boolean
}

const Post = ({
  post,
  likesAmount: _likesAmount,
  currentLike: _currentLike,
  categoryName,
  commentAmount,
  userId,
  isPinned,
  actions = true
}: PostProps) => {
  const router = useRouter()
  const titleSlug = slugify(post.title, { lower: true, strict: true })
  if (!post) {
    notFound()
  }

  return (
    <div
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        router.push(`/forum/${post.id}/${titleSlug}`)
      }}
      className={cn(
        isPinned && 'border-l-2 border-l-orange-600',
        'rounded-md dark:bg-slate-900 bg-slate-100 shadow dark:text-white text-black hover:cursor-pointer'
      )}
    >
      <div className="px-6 py-4 flex justify-between">
        <div className="w-0 flex-1">
          <div className="flex items-center max-h-40 dark:text-gray-300 text-black">
            <Image
              className="rounded-full w-8 h-8"
              alt=""
              width={500}
              height={500}
              src={post.user.imageUrl || avatarImg.src}
            />
            <div className="flex flex-col ml-2">
              <span
                onClick={e => {
                  e.stopPropagation()
                  router.push(`/user/${post.user.username}`)
                }}
                className="font-bold text-base hover:cursor-pointer hover:underline"
              >
                {post.user.username !== ''
                  ? post.user.username
                  : post.user.name}
              </span>
              <span className="text-xs">
                {getStringFromDate(post.createdAt.toString())} in{' '}
                <span
                  className="hover:cursor-pointer hover:underline"
                  onClick={e => {
                    e.stopPropagation()
                    router.push(`forum?category=${post.category.name}`)
                  }}
                >
                  {post.category.name}
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
            <div className="absolute inset-0 bg-gradient-to-t from-slate-100 dark:from-slate-900 from-0% to-50% rounded-md shadow-lg" />
          </div>
        </div>
        <div className="flex gap-x-2 items-start">
          {post.isPinned && isPinned && (
            <Icons.pin className="my-1 text-orange-600 fill-orange-600 h-5 w-5" />
          )}
          <Can I="delete" a="Post">
            {actions && <PostActions post={post} />}
          </Can>
        </div>
      </div>
      <div className="flex items-center text-sm p-2 gap-x-4 w-full">
        <PostLike post={post} userId={userId} />
        <Link
          href={`/${categoryName}/post/${post.id}`}
          className="w-fit flex items-center gap-x-2 hover:text-muted-foreground transition-colors"
        >
          <Icons.forum className="h-4 w-4" />
          <span className="font-semibold text-sm">{commentAmount}</span>
        </Link>
        {!isPinned && post.isPinned && (
          <div className="ml-auto flex items-center gap-2 pr-4">
            <Icons.pin className="text-orange-600 h-4 w-4" />
            <span className="text-sm text-muted-foreground">
              Post is pinned
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Post
