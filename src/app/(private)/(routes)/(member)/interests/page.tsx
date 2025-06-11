import Loading from '@/app/loading'
import { DefaultLayout } from '@/components/default-layout'
import Header from '@/components/header'
import prismadb from '@/lib/prismadb'
import { currentUser } from '@clerk/nextjs/server'
import { type Interest, type User, type UserInterest } from '@prisma/client'
import InterestExplorer from './components/interest-explorer'

export type InterestWithUsers = Interest & {
  users: Array<UserInterest & { user: User }>
}

const Interests = async () => {
  const user = await currentUser()

  const interests = await prismadb.interest.findMany({
    include: {
      users: {
        include: {
          user: true
        }
      }
    }
  })
  if (!user) return <Loading />

  return (
    <DefaultLayout>
      <Header title="Interests" />
      <InterestExplorer userId={user?.id} interests={interests} />
    </DefaultLayout>
  )
}

export default Interests
