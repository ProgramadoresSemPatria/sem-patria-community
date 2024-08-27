import { appRoutes } from '@/lib/constants'
import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { PersonalInfo } from './components/personal-info'

const ProfilePage = async () => {
  const { userId } = auth()
  if (!userId) return redirect(appRoutes.root)

  const user = await prismadb.user.findFirst({
    where: {
      id: userId
    }
  })

  if (!user) return redirect(appRoutes.root)

  return <PersonalInfo userProps={user} />
}

export default ProfilePage
