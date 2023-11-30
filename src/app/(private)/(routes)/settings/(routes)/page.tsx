import Header from '@/components/header'
import { Separator } from '@/components/ui/separator'
import { PersonalInfo } from './components/personal-info'
import { MembersList } from './components/members-list'
import { appRoutes } from '@/lib/constants'
import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const SettingsPage = async () => {
  const { userId } = auth()
  if (!userId) return redirect(appRoutes.root)

  const user = await prismadb.user.findFirst({
    where: {
      id: userId
    }
  })

  if (!user) return redirect(appRoutes.root)

  return (
    <>
      <PersonalInfo userProps={user} />
      <Separator className="my-6" />
      <Header
        title="Members of community"
        description="All members of this community and their levels."
      />
      <MembersList />
    </>
  )
}

export default SettingsPage
