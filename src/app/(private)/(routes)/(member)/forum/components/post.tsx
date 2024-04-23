'use client'

import { type ExtendedPost } from '@/lib/types'
import { getStringFromDate } from '@/lib/utils'
import Image from 'next/image'
import { EditorContent, useEditor } from '@tiptap/react'
import { MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { type FC, useRef } from 'react'
import StarterKit from '@tiptap/starter-kit'
import { useRouter } from 'next/navigation'
import PostLike from './post-likes'
import avatarImg from '@/assets/avatar.png'
import { PostActions } from './post-actions'

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

  // const editorTitle = useEditor({
  //   extensions: [
  //     StarterKit.configure({
  //       heading: {
  //         HTMLAttributes: {
  //           class: 'text-2xl font-bold'
  //         }
  //       },
  //       bulletList: {
  //         HTMLAttributes: {
  //           class: 'list-disc pl-4'
  //         }
  //       },
  //       orderedList: {
  //         HTMLAttributes: {
  //           class: 'list-decimal pl-4'
  //         }
  //       }
  //     })
  //   ],
  //   editable: false,
  //   content: post.title as string
  // })
  const isCurrentUserPost = post.userId === userId
  return (
    <div
      // onClick={e => {
      //   e.stopPropagation()
      //   router.push(`/forum/${post.id}`)
      // }}
      className="rounded-md bg-slate-900 shadow text-white hover:cursor-pointer "
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
          <div
            className="relative text-sm max-h-40 w-full mt-2 overflow-clip"
            ref={pRef}
          >
            {/* <EditorContent editor={editorTitle} /> */}
            <h1 className="font-bold text-2xl">{post.title}</h1>
            <EditorContent editor={editor} className="text-sm max-h-[80px]" />
            {pRef.current?.clientHeight === 160 ? (
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
            ) : null}
          </div>
        </div>
        {isCurrentUserPost && <PostActions post={post} />}{' '}
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
