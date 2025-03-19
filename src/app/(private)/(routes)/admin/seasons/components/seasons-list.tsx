'use client'
import Header from '@/components/header'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Can } from '@/hooks/use-ability'
import { appRoutes } from '@/lib/constants'
import { useRouter } from 'next/navigation'
import { seasonsColumns } from './columns'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { SkeletonCmsPage } from '@/components/skeletons/skeleton-cms-page'
import { type Season } from '@prisma/client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

async function fetchSeasons(): Promise<Season[]> {
  const response = await api.get('/api/season')
  return response.data.data
}

const SeasonsList = () => {
  const router = useRouter()

  const {
    data: seasons = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ['seasons'],
    queryFn: fetchSeasons,
    staleTime: 10 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false
  })

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
            Create
          </Button>
        </Can>
      </Header>
      <DataTable searchKey="name" columns={seasonsColumns} data={seasons} />
    </>
  )
}

export default SeasonsList
