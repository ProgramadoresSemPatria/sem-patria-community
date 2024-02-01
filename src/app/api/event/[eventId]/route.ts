import { auth } from '@clerk/nextjs'
import { NextResponse, type NextRequest } from 'next/server'

import prismadb from '@/lib/prismadb'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const { userId } = auth()
    const { title, description, location, date, externalUrl, specialGuest } =
      await req.json()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!title)
      return new NextResponse('Event title is required', { status: 400 })

    if (!description)
      return new NextResponse('Event description is required', { status: 400 })

    if (!location)
      return new NextResponse('Event location is required', { status: 400 })

    if (!date)
      return new NextResponse('Event date is required', { status: 400 })

    if (!params.eventId)
      return new NextResponse('Course id is required', { status: 400 })

    const course = await prismadb.event.updateMany({
      where: {
        id: params.eventId
      },
      data: {
        title,
        description,
        location,
        date,
        externalUrl,
        specialGuest
      }
    })

    return NextResponse.json(course)
  } catch (error) {
    console.log('[EVENT_ID_PATCH_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!params.eventId)
      return new NextResponse('Event id is required', { status: 400 })

    const course = await prismadb.event.deleteMany({
      where: {
        id: params.eventId
      }
    })

    return NextResponse.json(course)
  } catch (error) {
    console.log('[EVENT_ID_DELETE_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
