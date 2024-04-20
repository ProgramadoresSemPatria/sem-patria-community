'use client'

import { type ExtendedPost } from '@/lib/types'
import { getStringFromDate } from '@/lib/utils'
import Image from 'next/image'
import { Icons } from '@/components/icons'
import { type Like } from '@prisma/client'
import { EditorContent, useEditor } from '@tiptap/react'
import { MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { type FC, useRef, useReducer } from 'react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from '@/components/ui/button'
import PostLike from './post-likes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'


interface PostProps {
  post: ExtendedPost
  likesAmount: number
  categoryName: string
  currentLike?: boolean
  commentAmount: number
  userId: string
}

const Post: FC<PostProps> = ({
  post,
  likesAmount: _likesAmount,
  currentLike: _currentLike,
  categoryName,
  commentAmount,
  userId
}) => {
  const router = useRouter()

  const pRef = useRef<HTMLParagraphElement>(null)
  const queryClient = useQueryClient()


  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          HTMLAttributes: {
            class: 'text-xl font-bold'
          }
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc pl-4'
          }
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal pl-4'
          }
        }
      })
    ],
    editable: false,
    content: post.content as string
  })
  const { mutateAsync } = useMutation({
    mutationKey: ['like-comment'],
    mutationFn: async () => {
      return await api.put(`/api/post/${post.id}/likes`)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['video-comments'] })
    },
    onError: () => {
      toast({
        title: 'An error occurred.',
        description: 'Unable to like the comment',
        variant: 'destructive'
      })
    }
  })

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
      liked: post.likes.includes({userId, postId: post.id} ?? ''),
      likes: post.likes.length
    }
  )

  const handleLike = async () => {
    try {
      dispatch({ type: likeState.liked ? 'UNLIKE' : 'LIKE' })
      await mutateAsync()
    } catch (error) {
      dispatch({ type: likeState.liked ? 'LIKE' : 'UNLIKE' })
    }
  }
  return (
    <div onClick={() => router.push(`/forum/${post.id}`)} className="rounded-md bg-slate-900 shadow text-white hover:cursor-pointer ">
      <div className="px-6 py-4 flex justify-between">
      {/* <PostLike initialVotesAmt={post.likes.length} post={post} /> */}

        <div className="w-0 flex-1">
          <div className="flex max-h-40 text-gray-300">
            <Image
              className="rounded-full w-8 mr-1"
              alt=""
              width={500}
              height={500}
              src={(post.user.imageUrl as string) || ''}
            />
            <div className="flex flex-col -mt-2  ml-2">
              <span className="font-bold text-base">{post.user.username}</span>
              <span className="text-xs">
                {getStringFromDate(post.createdAt.toString())} in{' '}
                {post.category.name}{' '}
              </span>
            </div>
          </div>
          {post.title && (
            <a href={`/${categoryName}/post/${post.id}`}>
              <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
                {post.title}
              </h1>
            </a>
          )}
          <div
            className="relative text-sm max-h-40 w-full mt-2 overflow-clip"
            ref={pRef}
          >
            <EditorContent editor={editor} className="text-sm" />
            {pRef.current?.clientHeight === 160 ? (
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center w-fit space-x-1 font-bold text-slate-600 text-sm">
          <Button
            variant="ghost"
            size="icon"
            className="group rounded-full"
            onClick={handleLike}
          >
            <Icons.upVote
              data-userliked={likeState.liked}
              className="h-5 data-[userliked=true]:text-violet-900 group-hover:text-white "
              strokeWidth={2}
            />
          </Button>
          <p
            data-userliked={likeState.liked}
            className="leading-4 data-[userliked=true]:text-violet-900"
          >
            {_likesAmount}
          </p>
        </div>
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
