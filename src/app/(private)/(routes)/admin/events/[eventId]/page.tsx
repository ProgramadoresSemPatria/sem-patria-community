import prismadb from '@/lib/prismadb'
import { NewEventForm } from './components/new-event-form'

const NewEventPage = async ({ params }: { params: { eventId: string } }) => {
  const event = await prismadb.event.findUnique({
    where: { id: params.eventId }
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <NewEventForm initialData={event} />
      </div>
    </div>
  )
}

export default NewEventPage
