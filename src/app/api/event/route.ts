import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    const { title, description, date, location, externalUrl, specialGuest } =
      await req.json()

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

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    const { searchParams } = req.nextUrl
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    const filter =
      startDate && endDate
        ? {
            date: {
              gte: new Date(startDate),
              lte: new Date(endDate)
            }
          }
        : {}

    const events = await prismadb.event.findMany({
      where: {
        ...filter
      },
      orderBy: {
        date: 'asc'
      }
    })

    return NextResponse.json(events)
  } catch (error) {
    console.log('[EVENT_GET_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
