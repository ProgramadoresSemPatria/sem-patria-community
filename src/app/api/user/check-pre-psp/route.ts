import prismadb from '@/lib/prismadb'
import { clerkClient } from '@clerk/nextjs/server'
import { startOfDay, subDays } from 'date-fns'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const cronJobSecret = req.headers.get('Authorization')
  const validCronJobSecret = `Bearer ${process.env.CRON_SECRET}`

  if (!cronJobSecret || cronJobSecret !== validCronJobSecret) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const sevenDaysAgo = subDays(startOfDay(new Date()), 7)

    const users = await prismadb.user.findMany({
      where: {
        role: {
          has: 'PrePsp'
        },
        createdAt: {
          lte: sevenDaysAgo
        }
      }
    })

    const updates = users.map(async user => {
      const updatedRoles = user.role.filter(role => role !== 'PrePsp')

      if (!updatedRoles.includes('ProgramadorSemPatria')) {
        updatedRoles.push('ProgramadorSemPatria')
      }

      await clerkClient.users.updateUser(user.id, {
        publicMetadata: {
          github: user.github,
          instagram: user.instagram,
          level: user.level,
          linkedin: user.linkedin,
          location: user.location,
          position: user.position,
          role: updatedRoles
        }
      })

      return await prismadb.user.update({
        where: { id: user.id },
        data: { role: updatedRoles },
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      })
    })

    const updatedUsers = await Promise.all(updates)

    return NextResponse.json({
      message: 'Users updated successfully',
      updatedUsers
    })
  } catch (error) {
    console.log('[USER_ENABLE_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
