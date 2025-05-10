'use client'
import Header from '@/components/header'
import { Icons } from '@/components/icons'
import { SkeletonCmsPage } from '@/components/skeletons/skeleton-cms-page'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { useSeason } from '@/hooks/season/use-season'
import { Can } from '@/hooks/use-ability'
import { appRoutes } from '@/lib/constants'
import { useRouter } from 'next/navigation'
import { seasonsColumns } from './columns'
import { useCallback } from 'react'
import { ErrorState } from './error-state'
import { EmptyState } from './empty-state'

const SeasonsList = () => {
  const router = useRouter()
  const { useGetAllSeasons } = useSeason()

  const {
    data: seasonsData,
    isLoading,
    isError,
    error
  } = useGetAllSeasons({
    queryKey: ['getAllSeasons'],
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true
  })

  const seasons = seasonsData?.data || []

  const handleNewSeason = useCallback(() => {
    router.push(appRoutes.admin_seasons_new)
  }, [router])

  if (isLoading) return <SkeletonCmsPage />

  if (isError) {
    return (
      <ErrorState
        title="Failed to load seasons"
        description={
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred'
        }
        retry={() => {
          window.location.reload()
        }}
      />
    )
  }

  if (seasons.length === 0) {
    return (
      <>
        <Header title="Seasons">
          <Can I="create" a="Season">
            <Button type="button" onClick={handleNewSeason}>
              <Icons.plus className="w-4 h-4 mr-1" />
              New Season
            </Button>
          </Can>
        </Header>
        <EmptyState
          title="No seasons found"
          description="Create a new season to get started"
          action={
            <Can I="create" a="Season">
              <Button type="button" onClick={handleNewSeason}>
                <Icons.plus className="w-4 h-4 mr-1" />
                New Season
              </Button>
            </Can>
          }
        />
      </>
    )
  }

  return (
    <>
      <Header title="Seasons">
        <Can I="create" a="Season">
          <Button type="button" onClick={handleNewSeason}>
            <Icons.plus className="w-4 h-4 mr-1" />
            New Season
          </Button>
        </Can>
      </Header>
      <DataTable searchKey="name" columns={seasonsColumns} data={seasons} />
    </>
  )
}

export default SeasonsList
