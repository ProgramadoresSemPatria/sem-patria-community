import prismadb from '@/lib/prismadb'
import { currentUser, auth } from '@clerk/nextjs/server'
import { cookies } from 'next/headers'

export const ensureUsernameCookie = async () => {
  const cookieStore = cookies()
  const existing = cookieStore.get('x-username')
  if (existing) return existing.value

  const user = await currentUser()

  if (!user?.id) return null

  const username =
    user.username ||
    (
      await prismadb.user.findUnique({
        where: { id: user.id },
        select: { username: true }
      })
    )?.username

  if (!username) return null

  try {
    const { getToken } = auth()
    const token = await getToken()

    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? process.env.BASE_URL_PRODUCTION
        : 'http://localhost:3000'

    const url = `${baseUrl}/api/user/${user.id}/set-username-cookie`

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    await res.json().catch(e => {
      console.log('JSON parse error:', e)
    })
  } catch (error) {
    console.error('Error setting username cookie', error)
  }

  return username
}
