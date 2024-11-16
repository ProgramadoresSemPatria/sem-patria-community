import prismadb from '@/lib/prismadb'
import InterestsComponent from './components/interestsComponent'
import { type Interest, type User } from '@prisma/client'
import { DefaultLayout } from '@/components/default-layout'

export type InterestWithUsers = Interest & { users: User[] }

const Interests = async () => {
  const interests = await prismadb.interest.findMany({
    include: {
      users: true
    }
  })

  return (
    <DefaultLayout>
      <InterestsComponent interests={interests} />
    </DefaultLayout>
  )
}

export default Interests
