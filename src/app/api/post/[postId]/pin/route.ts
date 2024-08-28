import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function PUT(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const { userId } = auth()
    const { postId } = params

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!postId) return new NextResponse('Post id is required', { status: 400 })

    const existingPost = await prismadb.post.findUnique({
      where: {
        id: postId
      },
      include: { category: true }
    })

    if (!existingPost) {
      return new NextResponse('Post not found', { status: 404 })
    }

    const pinnedCount = await prismadb.post.count({
      where: {
        categoryId: existingPost.categoryId,
        isPinned: true
      }
    })

    if (pinnedCount >= 3 && !existingPost.isPinned) {
      return new NextResponse('Category already has 3 pinned posts', {
        status: 403
      })
    }

    const updatedPost = await prismadb.post.update({
      where: {
        id: postId
      },
      data: {
        isPinned: !existingPost.isPinned
      }
    })

    const message = updatedPost.isPinned ? 'Post pinned' : 'Post unpinned'

    return new NextResponse(message, { status: 200 })
  } catch (error) {
    console.log('[POST_COMMENTS_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
