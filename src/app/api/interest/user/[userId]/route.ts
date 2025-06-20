import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    const interests = await prismadb.interest.findMany({
      where: {
        users: {
          some: {
            userId: params.userId
          }
        }
      },
      include: {
        users: {
          include: {
            user: true
          }
        }
      }
    })

    return new NextResponse(JSON.stringify(interests), { status: 200 })
  } catch (error) {
    console.log('[CREATE_INTEREST_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
