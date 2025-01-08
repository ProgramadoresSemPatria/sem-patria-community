import { DefaultLayout } from '@/components/default-layout'
import { EventsCalendar } from '@/components/events-calendar'
import Header from '@/components/header'
import { Checklist } from '@/components/checklist'
import ForumWidget from './components/forum-widget'
import { PublicNotesCard } from './components/public-notes-card'

export default function Dashboard() {
  return (
    <DefaultLayout className="overflow-hidden">
      <Header title="Dashboard" />
      <div className="flex flex-col w-full h-full overflow-hidden">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 overflow-y-visible xl:overflow-hidden flex-grow">
          <div className="flex flex-col">
            <ForumWidget />
          </div>
          <div className="flex flex-col">
            <EventsCalendar isWidget />
            <div className="my-4" />
            <PublicNotesCard />
            <div className="my-4" />
          </div>
        </div>
        <div className="flex flex-col flex-grow my-4">
          <Checklist isWidget />
        </div>
      </div>
    </DefaultLayout>
  )
}
