import { SkeletonCmsPage } from '@/components/skeletons/skeleton-cms-page'
import prismadb from '@/lib/prismadb'
import { Suspense } from 'react'
import { type EventColumn } from './components/columns'
import EventsClient from './components/event-client'

const AdminEventsPage = async () => {
  const events = await prismadb.event.findMany({})

  const formattedEvents: EventColumn[] = events.map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    date: item.date,
    location: item.location,
    externalUrl: item.externalUrl ?? '',
    specialGuest: item.specialGuest ?? ''
  }))

  return (
    <div className="container flex-col pt-6">
      <Suspense fallback={<SkeletonCmsPage />}>
        <EventsClient events={formattedEvents} />
      </Suspense>
    </div>
  )
}

export default AdminEventsPage
