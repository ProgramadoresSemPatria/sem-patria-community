import Header from '@/components/header'
import { SkeletonMembersList } from '@/components/skeletons/skeleton-members-list'
import { Separator } from '@/components/ui/separator'
import { appRoutes } from '@/lib/constants'
import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { MembersList } from './components/members-list'
import { PersonalInfo } from './components/personal-info'

const SettingsPage = async () => {
  const { userId } = auth()
  if (!userId) return redirect(appRoutes.root)

  const user = await prismadb.user.findFirst({
    where: {
      id: userId
    }
  })

  if (!user) return redirect(appRoutes.root)

  const allUsers = await prismadb.user.findMany()

  return (
    <>
      <PersonalInfo userProps={user} />
      <Separator className="my-6" />
      <Header
        title="Members of community"
        description="All members of this community and their levels."
      />
      <Suspense fallback={<SkeletonMembersList />}>
        <MembersList userProps={user} allUsers={allUsers} />
      </Suspense>
    </>
  )
}

export default SettingsPage
