import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { AwardEnum } from '@prisma/client'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const createAwardResourceSchema = z.object({
  resource: z.nativeEnum(AwardEnum),
  baseScore: z.number(),
  disabled: z.boolean().optional()
})

// POST - /api/award-resource - create a new award resource
export async function POST(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    const body = await req.json()
    const parsed = createAwardResourceSchema.safeParse(body)

    if (!parsed.success) {
      return new NextResponse('Invalid information provided', { status: 401 })
    }

    const { resource, baseScore, disabled } = parsed.data

    const awardResource = await prismadb.awardResource.create({
      data: {
        resource,
        baseScore,
        disabled
      }
    })

    return NextResponse.json({ awardResource })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating award resource' },
      { status: 500 }
    )
  }
}
