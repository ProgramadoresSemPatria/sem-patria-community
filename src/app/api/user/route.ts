import generatePassword from '@/actions/auth/generate-password'
import { sendEmailWithLink } from '@/actions/auth/send-email-with-link'
import { emailTemplate } from '@/lib/constants'
import prismadb from '@/lib/prismadb'
import { Roles } from '@/lib/types'
import { auth, clerkClient } from '@clerk/nextjs'
import { NextResponse, type NextRequest } from 'next/server'

export async function PATCH(req: NextRequest) {
  try {
    const { userId: authUserId } = auth()
    const {
      email,
      name,
      github,
      username,
      instagram,
      level,
      linkedin,
      role,
      userId
    } = await req.json()

    if (!authUserId) return new NextResponse('Unauthenticated', { status: 401 })
    // Update user at Clerk
    const updatedUser = await clerkClient.users.updateUser(userId, {
      firstName: name,
      username,
      publicMetadata: {
        github,
        instagram,
        level,
        linkedin,
        role
      }
    })

    // If email was updated, update the primary email at Clerk
    if (email !== updatedUser.emailAddresses[0].emailAddress) {
      await clerkClient.emailAddresses.createEmailAddress({
        userId,
        emailAddress: email,
        primary: true,
        verified: true
      })
      // Remove the old email
      await clerkClient.emailAddresses.deleteEmailAddress(
        updatedUser.emailAddresses[0].id
      )
    }

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
  const { email, name, github, username, instagram, level, linkedin, role } =
    await req.json()

  const newUserPassword = generatePassword()

  try {
    const { userId } = auth()

    const currentUser = await prismadb.user.findFirst({
      where: { id: userId as string }
    })

    if (!currentUser?.role.includes(Roles.Admin))
      return new NextResponse('Unauthorized', { status: 401 })

    const hasUser = await prismadb.user.findFirst({
      where: {
        OR: [{ email }, { username }]
      }
    })
    if (hasUser) {
      const isEmail = hasUser.email === email
      return new NextResponse(
        `Already exists an user with this ${isEmail ? 'Email' : 'Username'}.`,
        {
          status: 400
        }
      )
    }

    const clerkUser = await clerkClient.users.createUser({
      emailAddress: [email],
      firstName: name,
      username,
      password: newUserPassword,
      publicMetadata: {
        github,
        instagram,
        level,
        linkedin,
        role
      }
    })

    const createdUser = await prismadb.user.create({
      data: {
        id: clerkUser.id,
        email,
        password: newUserPassword,
        name,
        username,
        imageUrl: clerkUser.imageUrl,
        github,
        instagram,
        level,
        linkedin,
        role
      }
    })

    await sendEmailWithLink(
      createdUser,
      emailTemplate,
      'Atualize sua senha - Borderless Coding Community'
    )

    return NextResponse.json(createdUser)
  } catch (error) {
    console.log('[USER_LEVEL_POST_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
