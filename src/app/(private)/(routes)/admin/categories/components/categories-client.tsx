'use client'
import Header from '@/components/header'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Separator } from '@/components/ui/separator'
import { appRoutes } from '@/lib/constants'
import { useRouter } from 'next/navigation'
import { type CategoryColumn, columns } from './columns'

type CategoriesClientProps = {
  categories: CategoryColumn[]
}

const CategoriesClient = ({ categories }: CategoriesClientProps) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Header
          title="Categories"
          description="Manage the categories of courses."
        />
        <Button
          onClick={() => {
            router.push(appRoutes.admin_categories_new)
          }}
        >
          <Icons.plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator className="my-6" />
      <DataTable searchKey="name" columns={columns} data={categories} />
    </>
  )
}

export default CategoriesClient
