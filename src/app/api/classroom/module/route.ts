import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth()
    const classroomId = req.nextUrl.searchParams.get('classroomId')

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!classroomId)
      return new NextResponse('Classroom Id is required', { status: 400 })

    const modules = await prismadb.classroomModule.findMany({
      where: {
        classroomId
      },
      include: {
        videos: true
      }
    })

    return NextResponse.json(modules)
  } catch (error) {
    console.log('[MODULES_GET_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()
    const { title, classroomId, fileUrl } = await req.json()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!title) return new NextResponse('Title is required', { status: 400 })

    if (!classroomId)
      return new NextResponse('Classroom Id is required', {
        status: 400
      })

    const module = await prismadb.classroomModule.create({
      data: {
        title,
        classroomId,
        fileUrl
      }
    })

    return NextResponse.json(module)
  } catch (error) {
    console.log('[MODULE_POST_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
