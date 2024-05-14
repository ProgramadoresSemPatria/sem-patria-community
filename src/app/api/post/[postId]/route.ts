import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse, type NextRequest } from 'next/server'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    console.log(params)
    const { userId } = auth()
    const { postId } = params

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!postId) return new NextResponse('Post id is required', { status: 400 })

    await prismadb.post.delete({
      where: {
        id: postId,
        userId
      }
    })

    // if (!post) return new NextResponse('Post not found', { status: 404 })

    return new NextResponse('Post deleted', { status: 200 })
  } catch (error) {
    console.log('[POST_COMMENTS_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
