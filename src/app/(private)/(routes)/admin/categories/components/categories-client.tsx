'use client'
import Header from '@/components/header'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { appRoutes } from '@/lib/constants'
import { useRouter } from 'next/navigation'
import { columns, type CategoryColumn } from './columns'

type CategoriesClientProps = {
  categories: CategoryColumn[]
}

const CategoriesClient = ({ categories }: CategoriesClientProps) => {
  const router = useRouter()

  return (
    <>
      <Header title="Categories">
        <Button
          onClick={() => {
            router.push(appRoutes.admin_categories_new)
          }}
        >
          <Icons.plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </Header>
      <DataTable searchKey="name" columns={columns} data={categories} />
    </>
  )
}

export default CategoriesClient
