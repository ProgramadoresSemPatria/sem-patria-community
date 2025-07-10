import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    const {
      title,
      description,
      date,
      location,
      externalUrl,
      specialGuest,
      allowedRoles
    } = await req.json()

    const newEvent = await prismadb.event.create({
      data: {
        title,
        description,
        date,
        location,
        externalUrl,
        specialGuest,
        allowedRoles
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

    const user = await prismadb.user.findUnique({ where: { id: userId } })
    const userRoles = user?.role || []

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
      }
    })

    // For each event, check access and filter externalUrl based on user roles
    const filteredEvents = events.map(event => ({
      ...event,
      externalUrl:
        userRoles.includes('Admin') ||
        (event.allowedRoles &&
          event.allowedRoles.some(role => userRoles.includes(role)))
          ? event.externalUrl
          : ''
    }))

    return NextResponse.json(filteredEvents)
  } catch (error) {
    console.log('[EVENT_GET_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
