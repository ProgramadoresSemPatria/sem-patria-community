import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()
    const { interest } = await req.json()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })
    const user = await prismadb.user.findUnique({
      where: { id: userId },
      select: { role: true }
    })

    if (!user || !user.role.includes('Admin')) {
      return new NextResponse('Forbidden: Only admins can create interests', {
        status: 403
      })
    }

    await prismadb.interest.create({
      data: {
        interest,
        createdAt: new Date()
      }
    })

    return new NextResponse('Post deleted', { status: 200 })
  } catch (error) {
    console.log('[CREATE_INTEREST_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function GET() {
  try {
    const interests = await prismadb.interest.findMany({
      include: {
        users: true
      }
    })

    return NextResponse.json(interests)
  } catch (error) {
    console.error('[INTERESTS_GET]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
