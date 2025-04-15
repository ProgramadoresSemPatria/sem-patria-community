import { getCurrentSeason } from '@/actions/leaderboard/get-current-season'
import { DefaultLayout } from '@/components/default-layout'
import { Icons } from '@/components/icons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { LeaderboardContent } from './content'
// import { mockLeaderboardData } from './mock-data'

const Leaderboard = async () => {
  // TEMPORARY: Use mock data instead of API call
  const currentSeason = await getCurrentSeason()
  // const currentSeason = mockLeaderboardData

  const formattedData = currentSeason
    ? {
        ...currentSeason
      }
    : null

  return (
    <DefaultLayout>
      <div className="mt-4 w-full max-w-7xl mx-auto h-[calc(100vh-8rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          <div className="lg:col-span-3 order-2 lg:order-1 h-full">
            <LeaderboardContent data={formattedData} />
          </div>
          <div className="order-1 lg:order-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary dark:text-muted-foreground text-lg sm:text-xl font-semibold">
                  Prizes
                </CardTitle>
              </CardHeader>
              <Separator className="mx-4 -my-2 w-auto" />

              <CardContent className="mt-8 px-4 space-y-6">
                {!currentSeason && (
                  <div className="text-muted-foreground">
                    No current season found
                  </div>
                )}

                {formattedData && (
                  <>
                    <ul className="space-y-6">
                      {formattedData.metadata?.awards?.map((award, index) => (
                        <li key={index} className="flex items-start space-x-4">
                          <Icons.award
                            className={cn(
                              'w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 mt-1',
                              award.position.includes('1')
                                ? 'text-yellow-500'
                                : award.position.includes('2')
                                  ? 'text-gray-400'
                                  : award.position.includes('3')
                                    ? 'text-orange-500'
                                    : 'text-green-500'
                            )}
                          />
                          <div className="flex-grow">
                            <span className="font-semibold text-lg">
                              {award.position}:
                            </span>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                              {award.description}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 text-sm text-muted-foreground space-y-2">
                      <p>{formattedData.metadata?.description}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Leaderboard
