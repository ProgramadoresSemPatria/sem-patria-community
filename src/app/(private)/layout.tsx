import { getCheckMembership } from '@/actions/get-check-membership'
import MainNav from '@/components/main-nav'
import { UserButton, currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function PrivateLayout({
  children
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()
  if (!user || !user.username) return redirect('/sign-in')

  const isMemberOfOrg = await getCheckMembership(user.username)

  if (!isMemberOfOrg) return redirect('/')

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </header>
      {children}
    </div>
  )
}
