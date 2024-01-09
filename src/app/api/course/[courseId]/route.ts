import { auth } from '@clerk/nextjs'
import { type NextRequest, NextResponse } from 'next/server'

import prismadb from '@/lib/prismadb'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth()
    const { name, categoryId, courseUrl, isPaid, level, isPending } =
      await req.json()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!categoryId)
      return new NextResponse('Category id is required', { status: 400 })

    if (!courseUrl)
      return new NextResponse('Course url is required', { status: 400 })

    if (!level) return new NextResponse('Level is required', { status: 400 })

    if (!name) return new NextResponse('Name is required', { status: 400 })

    if (!params.courseId)
      return new NextResponse('Course id is required', { status: 400 })

    const course = await prismadb.course.updateMany({
      where: {
        id: params.courseId
      },
      data: {
        name,
        courseUrl,
        level,
        isPaid,
        categoryId,
        isPending
      }
    })

    return NextResponse.json(course)
  } catch (error) {
    console.log('[COURSE_ID_PATCH_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!params.courseId)
      return new NextResponse('Course id is required', { status: 400 })

    const course = await prismadb.course.deleteMany({
      where: {
        id: params.courseId
      }
    })

    return NextResponse.json(course)
  } catch (error) {
    console.log('[COURSE_ID_DELETE_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
