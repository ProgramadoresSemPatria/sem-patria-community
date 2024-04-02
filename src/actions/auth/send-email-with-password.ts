import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
export const sendEmailWithPassword = async (
  email: string,
  password: string
) => {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Hello World',
    html: `<p>Your password is <strong>${password}</strong>!</p>`
  })
}
