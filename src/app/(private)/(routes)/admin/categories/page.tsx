import { DefaultLayout } from '@/components/default-layout'
import { SkeletonCmsPage } from '@/components/skeletons/skeleton-cms-page'
import prismadb from '@/lib/prismadb'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Suspense } from 'react'
import CategoriesClient from './components/categories-client'
import { type CategoryColumn } from './components/columns'

const AdminCategoriesPage = async () => {
  const categories = await prismadb.category.findMany()

  const formattedCategories: CategoryColumn[] = categories.map(item => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, 'dd-LL-yyyy', {
      locale: ptBR
    })
  }))

  return (
    <DefaultLayout>
      <Suspense fallback={<SkeletonCmsPage />}>
        <CategoriesClient categories={formattedCategories} />
      </Suspense>
    </DefaultLayout>
  )
}

export default AdminCategoriesPage
