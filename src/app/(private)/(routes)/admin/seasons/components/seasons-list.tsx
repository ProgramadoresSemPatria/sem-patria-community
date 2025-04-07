'use client'
import Header from '@/components/header'
import { Icons } from '@/components/icons'
import { SkeletonCmsPage } from '@/components/skeletons/skeleton-cms-page'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/ui/data-table'
import { useSeason } from '@/hooks/season/use-season'
import { Can } from '@/hooks/use-ability'
import { appRoutes } from '@/lib/constants'
import { useRouter } from 'next/navigation'
import { seasonsColumns } from './columns'

const SeasonsList = () => {
  const router = useRouter()
  const { useGetAllSeasons } = useSeason()

  const {
    data: seasonsData,
    isLoading,
    isError
  } = useGetAllSeasons({
    queryKey: ['getAllSeasons'],
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true
  })

  const seasons = seasonsData?.data || []

  if (isLoading) return <SkeletonCmsPage />

  if (isError)
    return (
      <Card className="m-4">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Failed to load seasons data.</p>
        </CardContent>
      </Card>
    )

  return (
    <>
      <Header title="Seasons">
        <Can I="create" a="Season">
          <Button
            type="button"
            onClick={() => {
              router.push(appRoutes.admin_seasons_new)
            }}
          >
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
