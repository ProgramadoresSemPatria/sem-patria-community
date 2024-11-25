'use client'
import Header from '@/components/header'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Can } from '@/hooks/use-ability'
import { appRoutes } from '@/lib/constants'
import { useRouter } from 'next/navigation'
import { columns, type InterestColumn } from './columns'

type InterestClientProps = {
  interests: InterestColumn[]
}

const InterestsClient = ({ interests }: InterestClientProps) => {
  const router = useRouter()

  return (
    <>
      <Header title="Interests">
        <Can I="create" a="Interest">
          <Button
            onClick={() => {
              router.push(appRoutes.admin_interests_new)
            }}
          >
            <Icons.plus className="w-4 h-4 mr-2" />
            Add New
          </Button>
        </Can>
      </Header>
      <DataTable searchKey="name" columns={columns} data={interests} />
    </>
  )
}

export default InterestsClient
