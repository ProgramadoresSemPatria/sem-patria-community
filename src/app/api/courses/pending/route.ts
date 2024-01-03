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
    console.log('[PENDING_COURSES_GET_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    const { searchParams } = req.nextUrl

    const courseId = searchParams.get('courseId')
    const updateType = searchParams.get('type')

    if (courseId == null || updateType == null) {
      return new NextResponse('Bad Request', { status: 400 })
    }

    if (updateType === 'approve') {
      await prismadb.course.update({
        where: {
          id: courseId
        },
        data: {
          isPending: false
        }
      })
    } else {
      await prismadb.course.delete({
        where: {
          id: courseId
        }
      })
    }

    return new NextResponse('OK', { status: 200 })
  } catch (error) {
    console.log('[PENDING_COURSES_PUT_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
