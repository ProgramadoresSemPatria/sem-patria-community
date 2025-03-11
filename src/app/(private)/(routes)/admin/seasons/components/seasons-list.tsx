'use client'
import Header from '@/components/header'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Can } from '@/hooks/use-ability'
import { appRoutes } from '@/lib/constants'
import { useRouter } from 'next/navigation'
import { type Season, seasonsColumns } from './columns'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { SkeletonCmsPage } from '@/components/skeletons/skeleton-cms-page'

async function fetchSeasons(): Promise<Season[]> {
  const response = await api.get('/api/season')
  return response.data
}

const SeasonsList = () => {
  const router = useRouter()

  const {
    data: seasons = [],
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['seasons'],
    queryFn: fetchSeasons,
    staleTime: 10 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false
  })

  if (isLoading) return <SkeletonCmsPage />
  if (isError)
    return <div>Error loading seasons: {error?.message || 'Unknown error'}</div>

  return (
    <>
      <Header title="Seasons">
        <Can I="create" a="Season">
          <Button
            onClick={() => {
              router.push(appRoutes.admin_seasons_new)
            }}
          >
            <Icons.plus className="w-4 h-4 mr-2" />
            Add New
          </Button>
        </Can>
      </Header>
      <DataTable searchKey="name" columns={seasonsColumns} data={seasons} />
    </>
  )
}

export default SeasonsList
