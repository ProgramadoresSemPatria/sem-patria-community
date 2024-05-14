import { getUser } from '@/actions/user/get-user'
import { appRoutes } from '@/lib/constants'
import { AbilityProvider } from '@/providers/ability.provider'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function PrivateLayout({
  children
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()
  if (!user) return redirect(appRoutes.signIn)

  const userProps = await getUser(user.id)
  if (!userProps) return redirect(appRoutes.signIn)

  return <AbilityProvider user={userProps}>{children}</AbilityProvider>
}
