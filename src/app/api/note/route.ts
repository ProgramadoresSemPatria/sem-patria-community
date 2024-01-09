import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    const note = await prismadb.note.create({
      data: {
        title: 'Untitled',
        userId
      }
    })

    return NextResponse.json(note)
  } catch (error) {
    console.log('[NOTE_POST_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
