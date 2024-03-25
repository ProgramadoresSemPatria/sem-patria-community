import prismadb from '@/lib/prismadb'
import { auth, clerkClient } from '@clerk/nextjs'
import { NextResponse, type NextRequest } from 'next/server'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!params.userId)
      return new NextResponse('User id required', { status: 400 })
    // Delete user at Clerk
    await clerkClient.users.deleteUser(params.userId)

    // Delete user at DB
    const user = await prismadb.user.delete({
      where: {
        id: params.userId
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log('[USER_DELETE_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
