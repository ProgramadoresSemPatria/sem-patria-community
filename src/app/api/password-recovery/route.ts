import { sendEmailWithLink } from '@/actions/auth/send-email-with-link'
import { passwordRecoveryEmailTemplate } from '@/lib/constants'
import prismadb from '@/lib/prismadb'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  try {
    const userToRecoverPassword = await prismadb.user.findFirst({
      where: { email }
    })

    if (!userToRecoverPassword)
      return new NextResponse('User not found', { status: 404 })

    await sendEmailWithLink(
      userToRecoverPassword,
      passwordRecoveryEmailTemplate,
      'Recuperação de senha - Borderless Coding Community'
    )

    return NextResponse.json({ message: 'Email sent' }, { status: 200 })
  } catch (error) {
    console.log('[PASSWORD_RECOVERY_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
