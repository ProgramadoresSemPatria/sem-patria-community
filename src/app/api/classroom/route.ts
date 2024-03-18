import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    const classrooms = await prismadb.classroom.findMany({
      include: {
        modules: true
      }
    })

    return NextResponse.json(classrooms)
  } catch (error) {
    console.log('[CLASSROOMS_GET_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()
    const { title, permissions } = await req.json()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!title) return new NextResponse('Title is required', { status: 400 })

    if (!permissions)
      return new NextResponse('At least one permission is required', {
        status: 400
      })

    const classroom = await prismadb.classroom.create({
      data: {
        title,
        permissions
      }
    })

    return NextResponse.json(classroom)
  } catch (error) {
    console.log('[CLASSROOM_POST_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
