import generatePassword from '@/actions/auth/generate-password'
import { sendEmailWithPassword } from '@/actions/auth/send-email-with-password'
import prismadb from '@/lib/prismadb'
import { auth, clerkClient } from '@clerk/nextjs'
import { NextResponse, type NextRequest } from 'next/server'

export async function PATCH(req: NextRequest) {
  try {
    const { userId } = auth()
    const { level } = await req.json()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!level) return new NextResponse('Level is required', { status: 400 })

    const user = await prismadb.user.update({
      where: {
        id: userId
      },
      data: {
        level
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log('[USER_LEVEL_PATCH_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { email, name, github, instagram, level, linkedin, role } =
    await req.json()

  const newUserPassword = generatePassword()

  // Create user at Clerk
  const clerkUser = await clerkClient.users.createUser({
    emailAddress: [email],
    firstName: name,
    username: github,
    password: newUserPassword,
    publicMetadata: {
      github,
      instagram,
      level,
      linkedin,
      role
    }
  })

  // Create user at DB
  const user = await prismadb.user.create({
    data: {
      id: clerkUser.id,
      email,
      password: newUserPassword,
      name,
      username: github,
      // TODO: Add imageUrl from Clerk to User
      // imageUrl: clerkUser.imageUrl,
      github,
      instagram,
      level,
      linkedin,
      role: [role]
    }
  })

  sendEmailWithPassword(email, newUserPassword)

  return NextResponse.json(user)
}
