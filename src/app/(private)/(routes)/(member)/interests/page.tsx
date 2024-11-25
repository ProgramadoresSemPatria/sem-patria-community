import prismadb from '@/lib/prismadb'
import { type Interest, type User } from '@prisma/client'
import { DefaultLayout } from '@/components/default-layout'
import { currentUser } from '@clerk/nextjs/server'
import Loading from '@/app/loading'
import InterestsComponent from './interestComponent'

export type InterestWithUsers = Interest & { users: User[] }

const Interests = async () => {
  const user = await currentUser()
  const interests = await prismadb.interest.findMany({
    include: {
      users: true
    }
  })
  if (!user) return <Loading />

  return (
    <DefaultLayout>
      <InterestsComponent userId={user?.id} interests={interests} />
    </DefaultLayout>
  )
}

export default Interests
