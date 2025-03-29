import { DefaultLayout } from '@/components/default-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Icons } from '@/components/icons'
import { leaderboardData } from '@/hooks/leaderboard/mock/data'
import { LeaderboardContent } from './content'

const Leaderboard = () => {
  const renderPrizes = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary dark:text-muted-foreground text-lg sm:text-xl font-semibold">
          Prizes
        </CardTitle>
      </CardHeader>
      <Separator className="mx-4 -my-2 w-auto" />

      <CardContent className="mt-8 px-4">
        <ul className="space-y-6">
          <li className="flex items-start space-x-4">
            <Icons.award className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 flex-shrink-0 mt-1" />
            <div className="flex-grow">
              <span className="font-semibold text-lg">1st Place:</span>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                $1000 cash prize + Exclusive Borderless Trophy
              </p>
            </div>
          </li>
          <li className="flex items-start space-x-4">
            <Icons.award className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 flex-shrink-0 mt-1" />
            <div className="flex-grow">
              <span className="font-semibold text-lg">2nd Place:</span>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                $500 cash prize + Silver Borderless Medal
              </p>
            </div>
          </li>
          <li className="flex items-start space-x-4">
            <Icons.award className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 flex-shrink-0 mt-1" />
            <div className="flex-grow">
              <span className="font-semibold text-lg">3rd Place:</span>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                $250 cash prize + Bronze Borderless Medal
              </p>
            </div>
          </li>
          <li className="flex items-start space-x-4">
            <Icons.sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 flex-shrink-0 mt-1" />
            <div className="flex-grow">
              <span className="font-semibold text-lg">Top 10:</span>
              <p className="text-sm text-muted-foreground mt-1">
                Exclusive Borderless Merchandise Pack (T-shirt, Mug, Stickers)
              </p>
            </div>
          </li>
          <li className="flex items-start space-x-4">
            <Icons.sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 flex-shrink-0 mt-1" />
            <div className="flex-grow">
              <span className="font-semibold text-lg">All Participants:</span>
              <p className="text-sm text-muted-foreground mt-1">
                Digital Certificate of Participation
              </p>
            </div>
          </li>
        </ul>
        <div className="mt-8 text-sm text-muted-foreground space-y-2">
          <p>Season 1 runs from June 1st to August 30th, 2025.</p>
          <p>
            Points are awarded based on community contributions, project
            completions, and peer recognition.
          </p>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <DefaultLayout>
      <div className="mt-4 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 order-2 lg:order-1">
            <LeaderboardContent leaderboardData={leaderboardData} />
          </div>
          <div className="order-1 lg:order-2">{renderPrizes()}</div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Leaderboard
