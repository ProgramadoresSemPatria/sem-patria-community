import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { interestId: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    const interest = await prismadb.interest.findUnique({
      where: { id: params.interestId },
      include: { users: true }
    })

    if (!interest) {
      return new NextResponse('Interest not found', { status: 404 })
    }

    return new NextResponse(JSON.stringify(interest), { status: 200 })
  } catch (error) {
    console.log('[GET_INTEREST_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { interestId: string } }
) {
  try {
    const { userId } = auth()
    const { interestId } = params
    const { interest } = await req.json()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    await prismadb.interest.update({
      where: { id: interestId },
      data: {
        interest
      }
    })

    return new NextResponse('Interest updated', { status: 200 })
  } catch (error) {
    console.log('[PUT_INTEREST_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { interestId: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    const user = await prismadb.user.findUnique({
      where: { id: userId },
      select: { role: true }
    })

    if (!user || !user.role.includes('Admin')) {
      return new NextResponse('Forbidden: Only admins can delete interests', {
        status: 403
      })
    }

    await prismadb.interest.delete({
      where: { id: params.interestId }
    })

    return new NextResponse('Interest deleted', { status: 200 })
  } catch (error) {
    console.log('[DELETE_INTEREST_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
