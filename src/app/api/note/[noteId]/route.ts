import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse, type NextRequest } from 'next/server'

export async function PUT(
  req: NextRequest,
  { params }: { params: { noteId: string } }
) {
  try {
    const { userId } = auth()
    const { title, content } = await req.json()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!title) return new NextResponse('Title is required', { status: 400 })

    if (!params.noteId)
      return new NextResponse('Note id is required', { status: 400 })

    const updatedNote = await prismadb.note.update({
      where: {
        id: params.noteId,
        userId
      },
      data: {
        title,
        content
      }
    })

    return NextResponse.json(updatedNote)
  } catch (error) {
    console.log('[NOTE_ID_PATCH_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { noteId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!params.noteId)
      return new NextResponse('Note id is required', { status: 400 })

    const note = await prismadb.note.delete({
      where: {
        id: params.noteId,
        userId
      }
    })

    return NextResponse.json(note)
  } catch (error) {
    console.log('[CATEGORY_ID_DELETE_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
