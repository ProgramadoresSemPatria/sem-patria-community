import prismadb from '@/lib/prismadb'
import { buildCodeUpBackupHtml } from '@/lib/codeup-backup'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    const [user, notes] = await Promise.all([
      prismadb.user.findUnique({
        where: { id: userId },
        select: { name: true, email: true }
      }),
      prismadb.note.findMany({
        where: { userId },
        orderBy: { createdAt: 'asc' }
      })
    ])

    const generatedAt = new Date()
    const html = buildCodeUpBackupHtml({
      notes,
      generatedAt,
      userName: user?.name,
      userEmail: user?.email
    })
    const fileDate = generatedAt.toISOString().slice(0, 10)

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `attachment; filename="codeup-backup-${fileDate}.html"`,
        'Cache-Control': 'no-store'
      }
    })
  } catch (error) {
    console.log('[NOTE_EXPORT_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
