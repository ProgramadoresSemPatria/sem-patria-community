import { auth } from '@clerk/nextjs'
import { NextResponse, type NextRequest } from 'next/server'

import prismadb from '@/lib/prismadb'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { moduleId: string } }
) {
  try {
    const { userId } = auth()
    const { title, classroomId } = await req.json()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!title) return new NextResponse('Title is required', { status: 400 })

    if (!classroomId)
      return new NextResponse('Classroom Id is required', {
        status: 400
      })

    if (!params.moduleId)
      return new NextResponse('Module Id is required', { status: 400 })

    const module = await prismadb.classroomModule.updateMany({
      where: {
        id: params.moduleId
      },
      data: {
        title,
        classroomId
      }
    })

    return NextResponse.json(module)
  } catch (error) {
    console.log('[MODULE_ID_PATCH_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { moduleId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!params.moduleId)
      return new NextResponse('Module Id is required', { status: 400 })

    const module = await prismadb.classroomModule.deleteMany({
      where: {
        id: params.moduleId
      }
    })

    return NextResponse.json(module)
  } catch (error) {
    console.log('[MODULE_ID_DELETE_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
