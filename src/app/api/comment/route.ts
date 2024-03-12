import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse, type NextRequest } from 'next/server'

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
