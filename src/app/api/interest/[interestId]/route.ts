import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { NextResponse, type NextRequest } from 'next/server'

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
