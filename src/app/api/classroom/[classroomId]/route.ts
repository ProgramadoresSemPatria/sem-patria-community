import { auth } from '@clerk/nextjs/server'
import { NextResponse, type NextRequest } from 'next/server'

import prismadb from '@/lib/prismadb'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { classroomId: string } }
) {
  try {
    const { userId } = auth()
    const { title, permissions } = await req.json()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!title) return new NextResponse('Title is required', { status: 400 })

    if (!permissions)
      return new NextResponse('At least one permission is required', {
        status: 400
      })

    if (!params.classroomId)
      return new NextResponse('Classroom id is required', { status: 400 })

    const classroom = await prismadb.classroom.updateMany({
      where: {
        id: params.classroomId
      },
      data: {
        title,
        permissions
      }
    })

    return NextResponse.json(classroom)
  } catch (error) {
    console.log('[CLASSROOM_ID_PATCH_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { classroomId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!params.classroomId)
      return new NextResponse('Classroom id is required', { status: 400 })

    const modulesVinculated = await prismadb.classroomModule.findMany({
      where: {
        classroomId: params.classroomId
      }
    })

    if (modulesVinculated)
      await prismadb.classroomModule.deleteMany({
        where: {
          classroomId: params.classroomId
        }
      })

    const classroom = await prismadb.classroom.deleteMany({
      where: {
        id: params.classroomId
      }
    })

    return NextResponse.json(classroom)
  } catch (error) {
    console.log('[CLASSROOM_ID_DELETE_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
