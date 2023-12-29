import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    const pendingApprovalCourses = await prismadb.course.findMany({
      where: {
        isPending: true
      },
      include: {
        category: true
      }
    })

    return NextResponse.json(pendingApprovalCourses)
  } catch (error) {
    console.log('[COURSES_GET_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
