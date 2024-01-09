import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { type NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest) {
  try {
    const { userId } = auth()
    const { level } = await req.json()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!level) return new NextResponse('Level is required', { status: 400 })

    const user = await prismadb.user.update({
      where: {
        id: userId
      },
      data: {
        level
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log('[USER_LEVEL_PATCH_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
