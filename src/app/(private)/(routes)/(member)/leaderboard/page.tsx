import { getCurrentSeason } from '@/actions/leaderboard/get-current-season'
import { DefaultLayout } from '@/components/default-layout'
import { Icons } from '@/components/icons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { LeaderboardContent } from './content'
import { Suspense } from 'react'
import { LeaderboardSkeleton } from './skeleton'

const Leaderboard = async () => {
  const currentSeason = await getCurrentSeason()

  if (!currentSeason) {
    return (
      <DefaultLayout>
        <div className="mt-4 w-full max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Icons.help className="h-10 w-10 text-destructive mb-4" />
            <h3 className="text-base font-medium text-destructive">
              No active season found
            </h3>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Please try again later
            </p>
          </div>
        </div>
      </DefaultLayout>
    )
  }

  return (
    <DefaultLayout>
      <div className="mt-6 w-full max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full">
          <div className="lg:col-span-3 order-2 lg:order-1 h-full">
            <Suspense fallback={<LeaderboardSkeleton />}>
              <LeaderboardContent data={currentSeason} />
            </Suspense>
          </div>
          <div className="order-1 lg:order-2">
            <Card>
              <CardHeader className="px-6 pb-4">
                <CardTitle className="text-gray-900 dark:text-muted-foreground text-lg sm:text-xl font-semibold">
                  Prizes
                </CardTitle>
              </CardHeader>

              <CardContent className="px-6 pt-4 space-y-8">
                {currentSeason.metadata?.awards?.length === 0 && (
                  <div className="text-muted-foreground py-2">
                    No prizes available for this season
                  </div>
                )}

                {currentSeason.metadata?.awards &&
                  currentSeason.metadata.awards.length > 0 && (
                    <>
                      <ul className="space-y-8">
                        {currentSeason.metadata.awards.map((award, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-4"
                          >
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
                                {award.position}
                              </span>
                              <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                                {award.description}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <Separator className="my-6" />

                      <div className="space-y-4">
                        <h4 className="text-gray-900 dark:text-muted-foreground text-lg sm:text-xl font-semibold">
                          Description
                        </h4>
                        <div className="text-sm text-muted-foreground">
                          <p>{currentSeason.metadata.description}</p>
                        </div>
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
