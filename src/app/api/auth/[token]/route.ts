import prismadb from '@/lib/prismadb'
import { clerkClient } from '@clerk/nextjs'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    if (!params.token)
      return new NextResponse('No token provided', { status: 401 })
    jwt.verify(params.token, process.env.JWT_SECRET as string, err => {
      if (err) {
        console.log(err)
        return new NextResponse('Invalid or expired token', { status: 401 })
      }
    })
    return new NextResponse('Authorized', { status: 200 })
  } catch (error) {
    console.log('[USER_LEVEL_GET_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  const saltRounds = 5
  const salt = await bcrypt.genSalt(saltRounds)
  const { password } = await req.json()
  const hashedPassword = await bcrypt.hash(password, salt)
  try {
    const decoded = jwt.decode(params.token)

    if (typeof decoded !== 'object' || !decoded?.userId)
      return new NextResponse('Unauthenticated', { status: 401 })

    await clerkClient.users.updateUser(decoded.userId, {
      password
    })

    const user = await prismadb.user.update({
      where: {
        id: decoded.userId
      },
      data: {
        password: hashedPassword
      }
    })

    if (!user)
      return new NextResponse(
        'An error occurs while updating the password. Try again later.',
        { status: 400 }
      )

    return NextResponse.json({ message: 'Password updated successfully' })
  } catch (error) {
    console.log('[USER_LEVEL_PATCH_ERROR]', error)
    return new NextResponse(
      'Password has been found in an online data breach. For account safety, please use a different password.',
      { status: 400 }
    )
  }
}
