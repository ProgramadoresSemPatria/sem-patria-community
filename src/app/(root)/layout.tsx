import { getCheckMembership } from '@/actions/get-check-membership'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function SetupLayout({
  children
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()
  if (!user || !user.username) return redirect('/sign-in')

  const isMemberOfOrg = await getCheckMembership(user.username)
  if (isMemberOfOrg) return redirect('/dashboard')

  return <>{children}</>
}
