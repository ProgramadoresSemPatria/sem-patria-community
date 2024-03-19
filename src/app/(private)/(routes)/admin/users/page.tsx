import { SkeletonCmsPage } from '@/components/skeletons/skeleton-cms-page'
import prismadb from '@/lib/prismadb'
import { Suspense } from 'react'
import { type UserColumn } from './components/columns'
import UsersClient from './components/user-client'

const AdminUsersPage = async () => {
  const users = await prismadb.user.findMany({})

  const formattedUsers: UserColumn[] = users.map(item => ({
    id: item.id,
    name: item.name,
    email: item.email,
    subscriptionDate: item.createdAt,
    lastAccess: new Date(),
    level: item.level,
    imageUrl: 'https://i.pravatar.cc'
  }))

  return (
    <div className="container flex-col pt-6">
      <Suspense fallback={<SkeletonCmsPage />}>
        <UsersClient users={formattedUsers} />
      </Suspense>
    </div>
  )
}

export default AdminUsersPage
