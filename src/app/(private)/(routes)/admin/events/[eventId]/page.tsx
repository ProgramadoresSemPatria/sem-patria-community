import { DefaultLayout } from '@/components/default-layout'
import prismadb from '@/lib/prismadb'
import { NewEventForm } from './components/new-event-form'

const NewEventPage = async ({ params }: { params: { eventId: string } }) => {
  const event = await prismadb.event.findUnique({
    where: { id: params.eventId }
  })

  return (
    <DefaultLayout>
      <NewEventForm initialData={event} />
    </DefaultLayout>
  )
}

export default NewEventPage
