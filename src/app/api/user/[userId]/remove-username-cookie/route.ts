import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

export async function POST() {
  const { userId } = auth()

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.delete('x-username')

  return response
}
