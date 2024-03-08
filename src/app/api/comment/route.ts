import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { videoId } = await req.json()
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!videoId)
      return new NextResponse('Video id is required', { status: 400 })

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
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(videoComments)
  } catch (error) {
    console.log('[GET_COMMENTS_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()
    const { videoId, content } = await req.json()

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
        content,
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

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = auth()
    const { commentId } = await req.json()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!commentId)
      return new NextResponse('Comment id is required', { status: 400 })

    const comment = await prismadb.comment.findFirst({
      where: {
        id: commentId
      }
    })

    if (!comment) return new NextResponse('Comment not found', { status: 404 })

    if (comment.userId !== userId)
      return new NextResponse('Unauthorized', { status: 403 })

    await prismadb.comment.delete({
      where: {
        id: commentId
      }
    })

    return new NextResponse('Comment deleted')
  } catch (error) {
    console.log('[DELETE_COMMENTS_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
