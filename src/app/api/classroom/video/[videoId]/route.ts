import { auth } from '@clerk/nextjs'
import { NextResponse, type NextRequest } from 'next/server'

import prismadb from '@/lib/prismadb'
import { type Attachment } from '@prisma/client'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { videoId: string } }
) {
  try {
    const { userId } = auth()
    const {
      title,
      videoUrl: url,
      description,
      classroomModuleId,
      attachments
    } = await req.json()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!title) return new NextResponse('Title is required', { status: 400 })

    if (!url) return new NextResponse('Video Url is required', { status: 400 })

    if (!params.videoId)
      return new NextResponse('Video Id is required', { status: 400 })

    const video = await prismadb.video.update({
      where: {
        id: params.videoId
      },
      data: {
        title,
        description,
        url,
        classroomModuleId,
        attachments: {
          create: attachments.map((attachment: Attachment) => ({
            name: attachment.name,
            type: attachment.type,
            size: attachment.size,
            url: attachment.url
          }))
        }
      }
    })

    return NextResponse.json(video)
  } catch (error) {
    console.log('[VIDEO_ID_PATCH_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { videoId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!params.videoId)
      return new NextResponse('Video Id is required', { status: 400 })

    const video = await prismadb.video.deleteMany({
      where: {
        id: params.videoId
      }
    })

    return NextResponse.json(video)
  } catch (error) {
    console.log('[VIDEO_ID_DELETE_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
