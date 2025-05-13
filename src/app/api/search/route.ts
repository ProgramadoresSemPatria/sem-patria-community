import { type Entity } from '@/hooks/search/types'
import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    const keyword = request.nextUrl.searchParams.get('keyword')
    if (!keyword) {
      return new NextResponse('Keyword is required', { status: 400 })
    }

    const [posts, users, courses, interests, events, modules, videos] =
      await prismadb.$transaction([
        prismadb.post.findMany({
          where: { title: { contains: keyword, mode: 'insensitive' } },
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            title: true,
            createdAt: true,
            category: { select: { name: true } },
            user: { select: { username: true } },
            _count: { select: { likes: true } }
          }
        }),

        prismadb.user.findMany({
          where: { username: { contains: keyword, mode: 'insensitive' } },
          select: {
            id: true,
            username: true,
            name: true,
            createdAt: true,
            imageUrl: true,
            followers: true
          }
        }),

        prismadb.course.findMany({
          where: { name: { contains: keyword, mode: 'insensitive' } },
          select: {
            id: true,
            name: true,
            createdAt: true,
            isPaid: true,
            level: true,
            courseUrl: true,
            category: { select: { name: true } }
          }
        }),

        prismadb.interest.findMany({
          where: { interest: { contains: keyword, mode: 'insensitive' } },
          select: {
            id: true,
            interest: true,
            createdAt: true,
            users: {
              select: {
                user: {
                  select: {
                    username: true
                  }
                }
              }
            }
          }
        }),

        prismadb.event.findMany({
          where: { title: { contains: keyword, mode: 'insensitive' } },
          select: {
            id: true,
            title: true,
            date: true,
            location: true,
            externalUrl: true,
            specialGuest: true
          }
        }),

        prismadb.classroomModule.findMany({
          where: { title: { contains: keyword, mode: 'insensitive' } },
          select: {
            id: true,
            title: true,
            classroom: { select: { title: true } },
            videos: { select: { id: true } }
          }
        }),

        prismadb.video.findMany({
          where: { title: { contains: keyword, mode: 'insensitive' } },
          select: {
            id: true,
            title: true,
            classroomModule: { select: { title: true } },
            createdAt: true
          }
        })
      ])

    const addEntityType = <T>(items: T[], entity: Entity) =>
      items.map(item => ({ ...item, entity }))

    const results = [
      ...addEntityType(posts, 'forum'),
      ...addEntityType(users, 'user'),
      ...addEntityType(courses, 'course'),
      ...addEntityType(interests, 'interest'),
      ...addEntityType(events, 'event'),
      ...addEntityType(modules, 'module'),
      ...addEntityType(videos, 'video')
    ]

    return NextResponse.json({
      data: { items: results },
      counts: {
        posts: posts.length,
        users: users.length,
        courses: courses.length,
        interests: interests.length,
        events: events.length,
        modules: modules.length,
        videos: videos.length
      },
      meta: {
        keyword,
        searchedAt: new Date().toISOString(),
        totalRecords: results.length
      }
    })
  } catch (error) {
    console.error('[SEARCH_API_ERROR]', error)
    return new NextResponse(
      JSON.stringify({
        error: 'Error searching for keyword',
        details: (error as Error).message
      }),
      { status: 500 }
    )
  }
}
