import { SkeletonCmsPage } from '@/components/skeletons/skeleton-cms-page'
import prismadb from '@/lib/prismadb'
import { Suspense } from 'react'
import { type UserColumn } from './components/columns'
import UsersClient from './components/user-client'
import { DefaultLayout } from '@/components/default-layout'

const AdminUsersPage = async () => {
  const users = await prismadb.user.findMany({})

  const formattedUsers: UserColumn[] = users.map(item => ({
    id: item.id,
    name: item.name,
    email: item.email,
    subscriptionDate: item.createdAt,
    lastAccess: item.lastLogin,
    level: item.level,
    imageUrl: item.imageUrl,
    role: item.role
  }))

  return (
    <DefaultLayout>
      <Suspense fallback={<SkeletonCmsPage />}>
        <UsersClient users={formattedUsers} />
      </Suspense>
    </DefaultLayout>
  )
}

export default AdminUsersPage
