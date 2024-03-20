import generatePassword from '@/actions/auth/generate-password'
import { sendEmailWithLink } from '@/actions/auth/send-email-with-link'
import prismadb from '@/lib/prismadb'
import { auth, clerkClient } from '@clerk/nextjs'
import { NextResponse, type NextRequest } from 'next/server'

export async function PATCH(req: NextRequest) {
  try {
    const { userId } = auth()
    const { email, name, github, instagram, level, linkedin, role, password } =
      await req.json()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })
    // Update user at Clerk
    await clerkClient.users.updateUser(userId, {
      primaryEmailAddressID: email,
      password,
      firstName: name,
      username: github,
      publicMetadata: {
        github,
        instagram,
        level,
        linkedin,
        role
      }
    })

    // Update user at DB
    const user = await prismadb.user.update({
      where: {
        id: userId
      },
      data: {
        email,
        name,
        username: github,
        github,
        instagram,
        level,
        linkedin,
        role
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
  try {
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
        imageUrl: clerkUser.imageUrl,
        github,
        instagram,
        level,
        linkedin,
        role: [role]
      }
    })

    await sendEmailWithLink(user)

    return NextResponse.json(user)
  } catch (error) {
    console.log('[USER_LEVEL_POST_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
