'use client'
import Header from '@/components/header'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Can } from '@/hooks/use-ability'
import { appRoutes } from '@/lib/constants'
import { useRouter } from 'next/navigation'
import { userColumns, type UserColumn } from './columns'

type UserClientProps = {
  users: UserColumn[]
}

const UsersClient = ({ users }: UserClientProps) => {
  const router = useRouter()

  return (
    <>
      <Header title="Users">
        <Can I="create" a="User">
          <Button
            onClick={() => {
              router.push(appRoutes.admin_users_new)
            }}
          >
            <Icons.plus className="w-4 h-4 mr-2" />
            New User
          </Button>
        </Can>
      </Header>
      <DataTable searchKey="title" columns={userColumns} data={users} />
    </>
  )
}

export default UsersClient
