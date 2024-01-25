import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    const { title, description, date, location, externalUrl, specialGuest } =
      await req.json()

    const titleAlreadyExists = await prismadb.event.findFirst({
      where: { title }
    })

    if (titleAlreadyExists)
      return new NextResponse('Title already exists', { status: 400 })

    const newEvent = await prismadb.event.create({
      data: {
        title,
        description,
        date,
        location,
        externalUrl,
        specialGuest
      }
    })

    return NextResponse.json(newEvent)
  } catch (error) {
    console.log('[EVENT_POST_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
