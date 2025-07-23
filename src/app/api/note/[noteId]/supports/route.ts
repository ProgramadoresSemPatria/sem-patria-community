import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import prismadb from '@/lib/prismadb'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { noteId: string } }
) {
  try {
    const { userId } = auth()
    const { noteId } = params

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!noteId) return new NextResponse('Note ID is required', { status: 400 })

    const note = await prismadb.note.findFirst({
      where: {
        id: noteId
      }
    })

    if (!note) return new NextResponse('Note not found', { status: 404 })

    const support = await prismadb.noteSupport.findFirst({
      where: {
        userId,
        noteId
      }
    })

    if (!support) {
      await prismadb.noteSupport.create({
        data: {
          userId,
          noteId
        }
      })
    } else {
      await prismadb.noteSupport.delete({
        where: {
          userId_noteId: {
            userId,
            noteId
          }
        }
      })
    }
    return new NextResponse('Support toggled', { status: 200 })
  } catch (error) {
    console.log('[NOTE_SUPPORT_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
