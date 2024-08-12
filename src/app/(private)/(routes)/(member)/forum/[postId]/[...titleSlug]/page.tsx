import { getPost } from '@/actions/post/get-post'
import defaultAvatar from '@/assets/avatar.png'
import BackButton from '@/components/back-button'
import { DefaultLayout } from '@/components/default-layout'
import NoteEditor from '@/components/editor/editor'
import { Separator } from '@/components/ui/separator'
import { type ExtendedPost } from '@/lib/types'
import { auth } from '@clerk/nextjs'
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
import Head from 'next/head'

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
  const img = parsedContent.content?.[1]?.attrs?.src || appLogo.src
  const title = post?.title || ''
  const altText = `Image for ${title}`

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title: post?.title || '',
      description: description || '',
      type: 'website',
      siteName: 'Borderless Community',
      url: `https://borderless-community-test.vercel.app/forum/${post?.id}/opengraph-image`,
      images: [
        {
          url: img,
          alt: altText,
          width: 1900,
          height: 630,
          type: 'image/png'
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
  const { userId } = auth()
  const post = await getPost(params.postId)
  const parsedContent = JSON.parse(post?.content as string)
  const description =
    parsedContent.content?.[0]?.content?.[0]?.text || 'Default description'
  const img = parsedContent.content?.[1]?.attrs?.src || appLogo.src
  const title = post?.title || 'Default Title'
  const altText = `Image for ${title}`

  return (
    <>
      <Head>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={img} />
        <meta property="og:image:alt" content={altText} />
        <meta property="og:image:width" content="1900" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:image:type" content="image/png" />
        <meta
          property="og:url"
          content={`https://borderless-community-test.vercel.app/forum/${post?.id}/opengraph-image`}
        />
      </Head>
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
                    href="#"
                    className="font-semibold hover:underline transition-all"
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
              {post && userId && (
                <>
                  <PostLike
                    post={post as unknown as ExtendedPost}
                    userId={userId}
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
              {post?.userId === userId && (
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
