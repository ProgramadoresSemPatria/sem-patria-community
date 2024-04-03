import { Resend } from 'resend'
import jwt from 'jsonwebtoken'
import { type User } from '@prisma/client'

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
  const url = `https://localhost:3000/set-password?token=${token}`

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: user.email,
    subject: 'Update password',
    html: `<p>Enter URL to update your password <strong>${url}</strong>!</p>`
  })
}
