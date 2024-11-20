import { DefaultLayout } from '@/components/default-layout'
import { SkeletonCmsPage } from '@/components/skeletons/skeleton-cms-page'
import prismadb from '@/lib/prismadb'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Suspense } from 'react'
import InterestsClient from './components/interests-client'

const AdminInterestsPage = async () => {
  const interests = await prismadb.interest.findMany()

  const interestFormatted = interests.map(item => ({
    id: item.id,
    interest: item.interest,
    createdAt: format(item.createdAt, 'dd-LL-yyyy', {
      locale: ptBR
    })
  }))

  return (
    <DefaultLayout>
      <Suspense fallback={<SkeletonCmsPage />}>
        <InterestsClient interests={interestFormatted} />
      </Suspense>
    </DefaultLayout>
  )
}

export default AdminInterestsPage
