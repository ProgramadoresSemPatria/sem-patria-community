import { emailTemplate } from '@/lib/constants'
import { type User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { Resend } from 'resend'

const generateToken = (user: User) => {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email
    },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  )
}

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmailWithLink = async (user: User) => {
  const token = generateToken(user)
  const url =
    process.env.NODE_ENV === 'development'
      ? `${process.env.BASE_URL_DEVELOPMENT}/set-password/${token}`
      : `${process.env.BASE_URL_PRODUCTION}/set-password/${token}`

  const htmlTemplate = emailTemplate(user, url)
  const userEmail =
    process.env.NODE_ENV === 'development'
      ? process.env.DEVELOPER_EMAIL
      : user.email

  const fromEmail =
    process.env.NODE_ENV === 'development'
      ? 'onboarding@resend.dev'
      : 'mentoria@borderlesscoding.com'

  await resend.emails.send({
    from: fromEmail,
    to: userEmail ?? user.email,
    subject: 'Atualize sua senha - Borderless Coding Community',
    html: htmlTemplate
  })
}
