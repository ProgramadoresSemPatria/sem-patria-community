import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { type NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { videoId: string; attachmentId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!params.videoId)
      return new NextResponse('Video Id is required', { status: 400 })

    if (!params.attachmentId)
      return new NextResponse('Attachment Id is required', { status: 400 })

    const attachment = await prismadb.attachment.delete({
      where: {
        id: params.attachmentId,
        videoId: params.videoId
      }
    })

    return NextResponse.json(attachment)
  } catch (error) {
    console.log('[ATTACHMENT_ID_DELETE_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
