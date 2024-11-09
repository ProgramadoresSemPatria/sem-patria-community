import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()
    const { interestId } = await req.json()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    await prismadb.user.update({
      where: { id: userId },
      data: {
        interests: {
          connect: { id: interestId }
        }
      }
    })

    return new NextResponse('Post deleted', { status: 200 })
  } catch (error) {
    console.log('[CREATE_INTEREST_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
