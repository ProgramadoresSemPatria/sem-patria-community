import defaultAvatar from '@/assets/avatar.png'
import { DefaultLayout } from '@/components/default-layout'
import NoteEditor from '@/components/editor/editor'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import prismadb from '@/lib/prismadb'
import { type ExtendedPost } from '@/lib/types'
import { auth } from '@clerk/nextjs'
import { type Comment } from '@prisma/client'
import format from 'date-fns/format'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import PostLike from '../components/post-likes'
import CommentSection from './components/comment-section'

interface PostPageProps {
  params: {
    postId: string
  }
}

export type ExtendedComment = Comment & {
  likes: Array<{
    userId: string
    postId: string
    commentId: string
  }>
  replies: ExtendedComment[]
  user: {
    imageUrl: string
    username: string
  }
  createdAt: string
}

const getPost = async (postId: string) => {
  const postById = await prismadb.post.findFirst({
    where: {
      id: postId
    },
    include: {
      category: true,
      comments: {
        include: {
          likes: true,
          replies: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  imageUrl: true
                }
              },
              likes: true
            }
          },
          user: {
            select: {
              id: true,
              username: true,
              imageUrl: true
            }
          }
        }
      },
      likes: true,
      user: {
        select: {
          id: true,
          username: true,
          imageUrl: true
        }
      }
    }
  })

  return postById
}

const PostPage = async ({ params }: PostPageProps) => {
  const { userId } = auth()
  const post = await getPost(params.postId)

  return (
    <DefaultLayout>
      <Suspense fallback={'loading'}>
        <div className="h-full flex flex-col items-center sm:items-start justify-between mt-10 w-full gap-4">
          <h1 className="font-bold text-4xl">{post?.title}</h1>
          <div className="flex gap-4 items-center mt-6">
            <Image
              src={post?.user.imageUrl || defaultAvatar}
              alt={post?.user.username || 'User Image'}
              width={1000}
              height={1000}
              className="rounded-full shadow-md w-12 h-12"
            />
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground truncate text-lg">
                <Link
                  href="#"
                  className="font-semibold hover:underline transition-all"
                >
                  {post?.user.username}
                </Link>
              </span>
              <span className="text-muted-foreground truncate text-sm">
                {post?.createdAt
                  ? format(post?.createdAt, 'MMMM dd, yyyy')
                  : 'Date not available'}
              </span>
            </div>
          </div>
          <div className="flex gap-6 mt-4 px-4 text-muted-foreground font-semibold text-md items-center">
            {post && userId && (
              <>
                <PostLike
                  initialVotesAmt={post.likes.length || 0}
                  post={post as unknown as ExtendedPost}
                  userId={userId}
                />

                <a href="#comments">
                  <div className="flex items-center w-fit space-x-1 mt-2 font-bold text-slate-600 text-sm">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="group rounded-full"
                    >
                      <Icons.forum
                        className="h-5 group-hover:text-white "
                        strokeWidth={2}
                      />
                    </Button>
                    <p className="leading-4">{post?.comments.length}</p>
                  </div>
                </a>
              </>
            )}
            <Separator decorative orientation="vertical" className="h-5 mt-2" />
            <p className="font-normal mt-2">at {post?.category.name}</p>
          </div>
          <Separator />
          <NoteEditor
            editable={false}
            initialValue={JSON.parse(post?.content as string)}
            variant="readonly"
          />
          <Separator />
          <CommentSection
            comments={post?.comments as unknown as ExtendedComment[]}
            postId={post?.id}
          />
        </div>
      </Suspense>
    </DefaultLayout>
  )
}

export default PostPage
