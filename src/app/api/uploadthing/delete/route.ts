import { auth } from '@clerk/nextjs'
import { NextResponse, type NextRequest } from 'next/server'
import { UTApi } from 'uploadthing/server'

const utapi = new UTApi()

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    const { imageKey } = await req.json()

    if (!imageKey)
      return new NextResponse('Image key is required', { status: 400 })

    const res = await utapi.deleteFiles(imageKey)
    return NextResponse.json(res)
  } catch (error) {
    console.log('Error uploadthing/delete:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
