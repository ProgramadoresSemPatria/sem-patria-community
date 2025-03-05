import { EventsCalendar } from '@/components/events-calendar'
import { DefaultLayout } from '@/components/default-layout'
import ForumWidget from './components/forum-widget'
import { PublicNotesCard } from './components/public-notes-card'
import { Checklist } from '@/components/checklist'
import Header from '@/components/header'
import LeaderboardWidget from './components/leaderboard-widget'

export default function Dashboard() {
  return (
    <DefaultLayout className="overflow-hidden">
      <Header title="Dashboard" />
      <div className="flex flex-col w-full h-full overflow-hidden">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 flex-grow">
          <div className="flex flex-col h-full">
            <ForumWidget />
            <div className="my-4" />
            <LeaderboardWidget />
          </div>

          <div className="flex flex-col gap-y-4 flex-grow overflow-hidden">
            <EventsCalendar isWidget />
            <PublicNotesCard />
          </div>
        </div>
        <div className="flex flex-col flex-grow my-4">
          <Checklist isWidget />
        </div>
      </div>
    </DefaultLayout>
  )
}
