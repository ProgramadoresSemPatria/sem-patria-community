import prismadb from '@/lib/prismadb'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Suspense } from 'react'
import CategoriesClient from './components/categories-client'
import { CategoryColumn } from './components/columns'
import { SkeletonCmsPage } from '@/components/skeletons/skeleton-cms-page'

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
    <div className="flex-col pt-6">
      <Suspense fallback={<SkeletonCmsPage />}>
        <CategoriesClient categories={formattedCategories} />
      </Suspense>
    </div>
  )
}

export default AdminCategoriesPage
