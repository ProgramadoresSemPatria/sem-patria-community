import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
export const sendEmailWithPassword = (email: string, password: string) => {
  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Hello World',
    html: `<p>Your password is <strong>${password}</strong>!</p>`
  })
}
