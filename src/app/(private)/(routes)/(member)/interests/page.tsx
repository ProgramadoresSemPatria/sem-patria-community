import { type Interest, type User, type UserInterest } from '@prisma/client'
import { DefaultLayout } from '@/components/default-layout'
import { currentUser } from '@clerk/nextjs/server'
import Loading from '@/app/loading'
import Header from '@/components/header'
import prismadb from '@/lib/prismadb'
import InterestExplorerClient from './components/interest-explorer-client'

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
      <InterestExplorerClient userId={user.id} initialInterests={interests} />
    </DefaultLayout>
  )
}

export default Interests
