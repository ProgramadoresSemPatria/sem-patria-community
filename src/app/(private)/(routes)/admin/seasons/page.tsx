import { DefaultLayout } from '@/components/default-layout'
import { SkeletonCmsPage } from '@/components/skeletons/skeleton-cms-page'
import { Suspense } from 'react'
import SeasonsList from './components/seasons-list'

const AdminSeasonsPage = () => {
  return (
    <DefaultLayout>
      <Suspense fallback={<SkeletonCmsPage />}>
        <SeasonsList />
      </Suspense>
    </DefaultLayout>
  )
}

export default AdminSeasonsPage
