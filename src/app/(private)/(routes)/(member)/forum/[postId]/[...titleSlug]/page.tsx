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

type PostPageProps = {
  params: {
    postId: string
    titleSlug: string
  }
}

// export async function generateMetadata({
//   params
// }: PostPageProps): Promise<Metadata> {
//   const post = await getPost(params.postId)
//   const parsedContent = JSON.parse(post?.content as string)
//   const description = parsedContent.content?.[0]?.content?.[0]?.text || ''
//   const img = parsedContent.content?.[1]?.attrs?.src || appLogo.src
//   const title = post?.title || ''
//   const altText = `Image for ${title}`

//   const metadata: Metadata = {
//     metadataBase: new URL('https://borderless-community-test.vercel.app'),
//     title,
//     description,
//     authors: [{ name: post?.user.username || 'Borderless psp' }],
//     twitter: {
//       title: post?.title || '',
//       description: description || '',
//       images: [
//         {
//           url: img,
//           alt: altText
//         }
//       ]
//     },
//     openGraph: {
//       url: `https://borderless-community-test.vercel.app/api/og/${params.postId}`,
//       siteName: 'Borderless Community',
//       title: post?.title || '',
//       description: description || '',
//       type: 'website',
//       images: [
//         {
//           url: img,
//           alt: altText
//         }
//       ]
//     }
//   }
//   return metadata
// }

export async function generateMetadata({
  params
}: PostPageProps): Promise<Metadata> {
  const metadata: Metadata = {
    metadataBase: new URL('https://borderless-community-test.vercel.app'),
    title: 'github',
    description: 'ewg rjkngre gbreknbgrek kgr4ngkkre,g',
    twitter: {
      title: 'github',
      description:
        'GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and fea...' ||
        '',
      images: [
        {
          url: 'https://github.githubassets.com/assets/campaign-social-031d6161fa10.png',
          alt: 'alt'
        }
      ]
    },
    openGraph: {
      url: `https://github.com`,
      siteName: 'Borderless Community',
      title: 'github',
      description: 'description' || '',
      type: 'website',
      images: [
        {
          url: 'https://github.githubassets.com/assets/campaign-social-031d6161fa10.png',
          alt: 'alt'
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
