import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { videoId: string } }
) {
  try {
    const { videoId } = params
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!videoId)
      return new NextResponse('Video Id is required', { status: 400 })

    const video = await prismadb.video.findFirst({
      where: {
        id: videoId
      }
    })

    if (!video) return new NextResponse('Video not found', { status: 404 })

    const videoComments = await prismadb.comment.findMany({
      where: {
        videoId
      },
      include: {
        user: {
          select: {
            username: true,
            imageUrl: true
          }
        },
        likes: {
          select: {
            userId: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const parsedComments = videoComments.map(comment => ({
      id: comment.id,
      username: comment.user.username,
      comment: comment.comment,
      userImage: comment.user.imageUrl,
      date: comment.createdAt,
      likes: comment.likes.map(like => like.userId)
    }))

    return NextResponse.json(parsedComments)
  } catch (error) {
    console.log('[GET_COMMENTS_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { videoId: string } }
) {
  try {
    const { userId } = auth()
    const { content } = await req.json()
    const { videoId } = params

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!content)
      return new NextResponse('Content is required', { status: 400 })

    if (!videoId)
      return new NextResponse('Video id is required', { status: 400 })

    const video = await prismadb.video.findFirst({
      where: {
        id: videoId
      }
    })

    if (!video) return new NextResponse('Video not found', { status: 404 })

    const newComment = await prismadb.comment.create({
      data: {
        comment: content,
        videoId,
        userId
      }
    })

    return NextResponse.json(newComment)
  } catch (error) {
    console.log('[POST_COMMENTS_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
