import { awardPoints, removePoints } from '@/actions/season/scoreService'
import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { AwardEnum } from '@prisma/client'
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

    const post = await prismadb.post.findFirst({
      where: {
        id: postId
      }
    })

    if (!post) return new NextResponse('Post not found', { status: 404 })

    const like = await prismadb.like.findFirst({
      where: {
        userId,
        postId
      }
    })

    let isAddingLike = false;

    if (!like) {
      isAddingLike = true;
      await prismadb.like.create({
        data: {
          userId,
          postId
        }
      })
    } else {
      isAddingLike = false;
      await prismadb.like.delete({
        where: {
          userId_postId: {
            postId,
            userId
          }
        }
      })
    }

    if (isAddingLike) {
      const awardResult = await awardPoints(
        userId,
        AwardEnum.FORUM_POST_LIKE,
        post.userId
      )

      if (!awardResult.success && 'error' in awardResult) {
        console.log('[AWARD_POINTS_FAILED]', awardResult.error)
      }
    } else {
      const removeResult = await removePoints(
        userId,
        AwardEnum.FORUM_POST_LIKE,
        post.userId
      )

      if (!removeResult.success && 'error' in removeResult) {
        console.log('[REMOVE_POINTS_FAILED]', removeResult.error)
      }
    }

    return new NextResponse('Like toggled', { status: 200 })
  } catch (error) {
    console.log('[POST_LIKES_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
