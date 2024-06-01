import { DefaultLayout } from '@/components/default-layout'
import { EventsCalendar } from '@/components/events-calendar'
import Header from '@/components/header'
import ForumWidget from './components/forum-widget'
import { PublicNotesCard } from './components/public-notes-card'

export default function Dashboard() {
  return (
    <DefaultLayout className="overflow-hidden">
      <Header title="Dashboard" />
      <div className="flex flex-col w-full h-full max-h-[calc(100vh-8rem)] overflow-hidden">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 overflow-y-visible xl:overflow-hidden">
          <div className="flex flex-col h-full">
            <EventsCalendar isWidget />
            <div className="my-4" />
            <PublicNotesCard />
          </div>
          <div className="flex-col lg:flex">
            <ForumWidget />
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}
