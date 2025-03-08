import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    const { searchParams } = request.nextUrl
    const keyword = searchParams.get('keyword')

    if (!keyword) {
      return new NextResponse('Keyword is required', { status: 400 })
    }

    const queryPosts = prismadb.post.findMany({
      where: {
        title: {
          contains: keyword,
          mode: 'insensitive'
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        category: {
          select: {
            name: true
          }
        },
        user: {
          select: {
            username: true
          }
        },
        _count: {
          select: { likes: true }
        }
      }
    })

    const queryUsers = prismadb.user.findMany({
      where: {
        username: {
          contains: keyword,
          mode: 'insensitive'
        }
      },
      select: {
        id: true,
        username: true,
        name: true,
        createdAt: true,
        imageUrl: true,
        followers: true
      }
    })

    const queryClassrooms = prismadb.classroom.findMany({
      where: {
        title: {
          contains: keyword,
          mode: 'insensitive'
        }
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        modules: {
          select: {
            videos: {
              select: {
                id: true
              }
            }
          }
        }
      }
    })

    const queryCourses = prismadb.course.findMany({
      where: {
        name: {
          contains: keyword,
          mode: 'insensitive'
        }
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        isPaid: true,
        level: true,
        category: {
          select: {
            name: true
          }
        }
      }
    })

    const interestsQuery = prismadb.interest.findMany({
      where: {
        interest: {
          contains: keyword,
          mode: 'insensitive'
        }
      },
      select: {
        id: true,
        interest: true,
        createdAt: true,
        users: {
          select: {
            username: true
          }
        }
      }
    })

    const queryEvents = prismadb.event.findMany({
      where: {
        title: {
          contains: keyword,
          mode: 'insensitive'
        }
      },
      select: {
        id: true,
        title: true,
        date: true,
        location: true,
        externalUrl: true,
        specialGuest: true
      }
    })

    const [posts, users, classrooms, courses, interests, events] =
      await prismadb.$transaction([
        queryPosts,
        queryUsers,
        queryClassrooms,
        queryCourses,
        interestsQuery,
        queryEvents
      ])

    return NextResponse.json({
      data: {
        items: [
          ...posts.map(post => ({ ...post, entity: 'forum' })),
          ...users.map(user => ({ ...user, entity: 'user' })),
          ...classrooms.map(classroom => ({
            ...classroom,
            entity: 'classroom'
          })),
          ...courses.map(course => ({
            ...course,
            entity: 'course'
          })),
          ...interests.map(interest => ({
            ...interest,
            entity: 'interest'
          })),
          ...events.map(event => ({
            ...event,
            createdAt: event.date,
            entity: 'event'
          }))
        ],
        counts: {
          posts: posts.length,
          users: users.length,
          classrooms: classrooms.length,
          courses: courses.length,
          interests: interests.length,
          events: events.length
        }
      },
      meta: {
        keyword,
        searchedAt: new Date().toISOString(),
        totalRecords:
          posts.length + users.length + classrooms.length + courses.length
      }
    })
  } catch (error) {
    return new NextResponse('Error searching for keyword', { status: 500 })
  }
}
