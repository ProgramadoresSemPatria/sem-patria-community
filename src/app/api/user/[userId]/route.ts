import prismadb from '@/lib/prismadb'
import { auth, clerkClient } from '@clerk/nextjs/server'
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

    try {
      await clerkClient.users.deleteUser(params.userId)
    } catch (clerkError) {
      console.log('[CLERK_USER_DELETE_ERROR]', clerkError)
    }

    let user = {}
    try {
      user = await prismadb.user.update({
        where: {
          id: params.userId
        },
        data: {
          isDisabled: true
        }
      })
    } catch (dbError) {
      console.log('[DB_USER_DELETE_ERROR]', dbError)
    }

    return NextResponse.json(user)
  } catch (error) {
    console.log('[USER_DELETE_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
