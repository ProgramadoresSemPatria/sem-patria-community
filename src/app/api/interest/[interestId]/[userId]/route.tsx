import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(
  req: NextRequest,
  { params }: { params: { interestId: string; userId: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })
    if (!(params.userId === userId)) {
      return new NextResponse('Don`t have permission', { status: 401 })
    }

    await prismadb.user.update({
      where: { id: params.userId },
      data: {
        interests: {
          connect: { id: params.interestId }
        }
      }
    })

    return new NextResponse('Post deleted', { status: 200 })
  } catch (error) {
    console.log('[CONNECT_INTEREST_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { interestId: string; userId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    if (!(params.userId === userId)) {
      return new NextResponse('Don`t have permission', { status: 401 })
    }
    await prismadb.user.update({
      where: { id: userId },
      data: {
        interests: {
          disconnect: { id: params.interestId }
        }
      }
    })

    return new NextResponse('Interest removed successfully', { status: 200 })
  } catch (error) {
    console.error('[REMOVE_INTEREST_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
