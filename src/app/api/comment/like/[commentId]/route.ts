import { awardPoints, removePoints } from '@/actions/season/scoreService'
import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { AwardEnum } from '@prisma/client'
import { NextResponse, type NextRequest } from 'next/server'

export async function PUT(
  req: NextRequest,
  { params }: { params: { commentId: string } }
) {
  try {
    const { userId } = auth()
    const { commentId } = params

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!commentId)
      return new NextResponse('Comment id is required', { status: 400 })

    const comment = await prismadb.comment.findFirst({
      where: {
        id: commentId
      }
    })

    if (!comment) return new NextResponse('Comment not found', { status: 404 })

    const like = await prismadb.commentLike.findFirst({
      where: {
        userId,
        commentId
      }
    })

    // Variável para rastrear se estamos adicionando ou removendo um like
    let isAddingLike = false;

    if (!like) {
      // Adicionando like
      isAddingLike = true;
      await prismadb.commentLike.create({
        data: {
          userId,
          commentId
        }
      })
    } else {
      // Removendo like
      isAddingLike = false;
      await prismadb.commentLike.delete({
        where: {
          userId_commentId: {
            userId,
            commentId
          },
          userId,
          commentId
        }
      })
    }

    // Adicionar ou remover pontos com base na ação
    if (isAddingLike) {
      const awardResult = await awardPoints(
        userId,
        AwardEnum.FORUM_POST_COMMENT_LIKE,
        comment.userId
      )

      if (!awardResult.success && 'error' in awardResult) {
        console.log('[AWARD_POINTS_FAILED]', awardResult.error)
      }
    } else {
      const removeResult = await removePoints(
        userId,
        AwardEnum.FORUM_POST_COMMENT_LIKE,
        comment.userId
      )

      if (!removeResult.success && 'error' in removeResult) {
        console.log('[REMOVE_POINTS_FAILED]', removeResult.error)
      }
    }

    return new NextResponse('Like toggled', { status: 200 })
  } catch (error) {
    console.log('[POST_COMMENTS_LIKE_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
