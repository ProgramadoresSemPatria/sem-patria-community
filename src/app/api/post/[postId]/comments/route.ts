import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const { userId } = auth()
    const { postId } = params
    const { content } = await req.json()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!postId) return new NextResponse('Post id is required', { status: 400 })

    if (!content)
      return new NextResponse('Content is required', { status: 400 })

    const post = await prismadb.post.findFirst({
      where: {
        id: postId
      }
    })

    if (!post) return new NextResponse('Post not found', { status: 404 })

    const newPostComment = await prismadb.comment.create({
      data: {
        postId,
        comment: content,
        userId
      }
    })

    return NextResponse.json(newPostComment, { status: 200 })
  } catch (error) {
    console.log('[POST_COMMENTS_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const { userId } = auth()
    const { postId } = params

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!postId) return new NextResponse('Post id is required', { status: 400 })

    const post = await prismadb.post.findFirst({
      where: {
        id: postId
      }
    })

    if (!post) return new NextResponse('Post not found', { status: 404 })

    const comments = await prismadb.comment.findMany({
      where: {
        postId
      },
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
    })

    return NextResponse.json(comments, { status: 200 })
  } catch (error) {
    console.log('[POST_COMMENTS_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
