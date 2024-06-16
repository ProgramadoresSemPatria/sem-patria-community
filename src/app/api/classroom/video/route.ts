import { type VideoOrder } from '@/app/(private)/(routes)/(member)/mentorship/[videoId]/components/mentorship-tab/use-mentorship-tab'
import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth()
    const videoId = req.nextUrl.searchParams.get('videoId')

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (videoId) {
      const video = await prismadb.video.findUnique({
        where: {
          id: videoId
        }
      })

      return NextResponse.json(video)
    }

    const videos = await prismadb.video.findMany({
      include: {
        classroomModule: true
      }
    })

    return NextResponse.json(videos)
  } catch (error) {
    console.log('[VIDEOS_GET_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()
    const {
      title,
      videoUrl: url,
      description,
      classroomModuleId
    } = await req.json()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!title) return new NextResponse('Title is required', { status: 400 })

    if (!url) return new NextResponse('Video Url is required', { status: 400 })

    const video = await prismadb.video.create({
      data: {
        title,
        description,
        url,
        classroomModuleId
      }
    })

    return NextResponse.json(video)
  } catch (error) {
    console.log('[VIDEO_POST_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { userId } = auth()
    const { order } = await req.json()
    console.log('order', order)

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    // eslint-disable-next-line @typescript-eslint/promise-function-async
    const updatePromises = order.map((video: VideoOrder) => {
      return prismadb.video.update({
        where: { id: video.id },
        data: { order: video.order }
      })
    })

    const updatedVideos = await prismadb.$transaction(updatePromises)

    return NextResponse.json(updatedVideos)
  } catch (error) {
    console.log('[VIDEOS_PATCH_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
