import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })
  } catch (error) {
    console.log('[CREATE_INTEREST_ERROR]', error)
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
    const { interestId } = params

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    await prismadb.interest.delete({
      where: { id: interestId }
    })

    return new NextResponse('Interest deleted', { status: 200 })
  } catch (error) {
    console.log('[DELETE_INTEREST_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
