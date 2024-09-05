import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(
  req: NextRequest,
  { params }: { params: { repliedCommentId: string } }
) {
  try {
    const { userId } = auth()
    const { repliedCommentId } = params
    const { content } = await req.json()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!repliedCommentId)
      return new NextResponse('Replied comment id is required', { status: 400 })

    if (!content)
      return new NextResponse('Content is required', { status: 400 })

    const repliedComment = await prismadb.comment.findFirst({
      where: {
        id: repliedCommentId
      }
    })

    if (!repliedComment)
      return new NextResponse('Replied comment not found', { status: 404 })

    const newReplyComment = await prismadb.comment.create({
      data: {
        replyToId: repliedCommentId,
        comment: content,
        userId
      }
    })

    return NextResponse.json(newReplyComment, { status: 200 })
  } catch (error) {
    console.log('[POST_REPLIEDS_COMMENTS_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
