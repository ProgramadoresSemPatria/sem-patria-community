import { getPost } from '@/actions/post/get-post'
import defaultAvatar from '@/assets/avatar.png'
import BackButton from '@/components/back-button'
import { DefaultLayout } from '@/components/default-layout'
import NoteEditor from '@/components/editor/editor'
import { Separator } from '@/components/ui/separator'
import { type ExtendedPost } from '@/lib/types'
import { auth } from '@clerk/nextjs/server'
import format from 'date-fns/format'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import PostLike from '../../components/post-likes'
import CommentSection from '../components/comment-section'
import EditPostButton from '../components/edit-post-button'
import PostCommentsLink from '../components/post-comments-link'
import { type Comment } from '@prisma/client'
import { type Metadata } from 'next'
import appLogo from '@/assets/app-logo-light.png'
import { notFound } from 'next/navigation'

type PostPageProps = {
  params: {
    postId: string
    titleSlug: string
  }
}

export async function generateMetadata({
  params
}: PostPageProps): Promise<Metadata> {
  const post = await getPost(params.postId)
  const parsedContent = JSON.parse(post?.content as string)
  const description = parsedContent.content?.[0]?.content?.[0]?.text || ''
  const imageItem = parsedContent.content?.find(
    (item: { type: string; attrs: { src: string } }) =>
      item.type === 'image' && item.attrs?.src
  )
  const img = imageItem?.attrs?.src || appLogo.src
  const title = post?.title || ''
  const altText = `Image for ${title}`

  const metadata: Metadata = {
    metadataBase: new URL('https://borderless-community-test.vercel.app'),
    title,
    description,
    authors: [{ name: post?.user.username || 'Borderless psp' }],
    twitter: {
      title: post?.title || '',
      description: description || '',
      images: [
        {
          url: img,
          alt: altText
        }
      ]
    },
    openGraph: {
      url: `https://borderless-community-test.vercel.app/api/og/${params.postId}`,
      siteName: 'Borderless Community',
      title: post?.title || '',
      description: description || '',
      type: 'website',
      images: [
        {
          url: img,
          alt: altText
        }
      ]
    }
  }
  return metadata
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
    name: string
    username: string
  }
  createdAt: string
}

const PostPage = async ({ params }: PostPageProps) => {
  const { userId: loggedInUserId } = auth()
  const post = await getPost(params.postId)
  if (!post) {
    notFound()
  }

  return (
    <>
      <DefaultLayout>
        <Suspense fallback={'loading'}>
          <div className="h-full flex flex-col items-center sm:items-start justify-between mt-10 w-full gap-4">
            <BackButton isIcon={false} />
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
                    href={`/user/${post?.user.username}`}
                    className="font-semibold hover:underline transition-all hover:cursor-pointer"
                  >
                    {post?.user.username !== ''
                      ? post?.user.username
                      : post?.user.name}
                  </Link>
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {post?.createdAt
                    ? format(post?.createdAt, 'MMMM dd, yyyy')
                    : 'Date not available'}
                </span>
                {post?.updatedAt && (
                  <span className="text-muted-foreground truncate text-xs">
                    Last updated at{' '}
                    {format(post?.updatedAt, 'MM dd, yyyy, HH:mm')}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-6 mt-4 px-4 text-muted-foreground w-full font-semibold text-md items-center">
              {post && loggedInUserId && (
                <>
                  <PostLike
                    post={post as unknown as ExtendedPost}
                    loggedInUserId={loggedInUserId}
                    isPostPage
                  />

                  <PostCommentsLink
                    comments={post?.comments as unknown as ExtendedComment[]}
                    postId={post.id}
                  />
                </>
              )}
              <Separator decorative orientation="vertical" className="h-5" />
              <p className="font-normal">at {post?.category.name}</p>
              {post?.userId === loggedInUserId && (
                <EditPostButton
                  postId={post?.id}
                  title={post.title}
                  content={post.content}
                  categoryId={post.categoryId}
                />
              )}
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
    </>
  )
}

export default PostPage
