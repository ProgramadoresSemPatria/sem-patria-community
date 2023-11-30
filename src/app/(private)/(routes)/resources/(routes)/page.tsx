import Header from '@/components/header'
import prismadb from '@/lib/prismadb'
import { Suspense } from 'react'
import ResourcesContent from '../components/resources-content'
import { SkeletonResourceCards } from '../components/skeleton-resource-cards'

const ResourcesPage = async () => {
  const categories = await prismadb.category.findMany()
  return (
    <>
      <Suspense fallback={<SkeletonResourceCards />}>
        <Header title="Resources" />
        <ResourcesContent categories={categories} />
      </Suspense>
    </>
  )
}

export default ResourcesPage
