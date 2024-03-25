import { type NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import prismadb from '@/lib/prismadb'
import { clerkClient } from '@clerk/nextjs'
import bcrypt from 'bcrypt'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams

  jwt.verify(token.toString(), process.env.JWT_SECRET as string, err => {
    if (err) {
      return new NextResponse('Invalid or expired token', { status: 401 })
    }
    return new NextResponse('Authorized', { status: 200 })
  })
}

export async function PATCH(req: NextRequest) {
  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)
  const { password } = await req.json()
  const hashedPassword = await bcrypt.hash(password, salt)
  try {
    const params = req.nextUrl.searchParams
    const token = params.get('token')

    const decoded = jwt.decode(token as string)

    if (typeof decoded !== 'object' || !decoded?.userId)
      return new NextResponse('Unauthenticated', { status: 401 })

    await clerkClient.users.updateUser(decoded.userId, {
      password
    })

    await prismadb.user.update({
      where: {
        id: decoded.userId
      },
      data: {
        password: hashedPassword
      }
    })

    return NextResponse.json({ message: 'Password updated successfully' })
  } catch (error) {
    console.log('[USER_LEVEL_PATCH_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
