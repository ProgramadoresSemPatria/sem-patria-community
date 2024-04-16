'use client'
import Header from '@/components/header'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Can } from '@/hooks/use-ability'
import { appRoutes } from '@/lib/constants'
import { useRouter } from 'next/navigation'
import { eventColumns, type EventColumn } from './columns'

type EventsClientProps = {
  events: EventColumn[]
}

const EventsClient = ({ events }: EventsClientProps) => {
  const router = useRouter()

  return (
    <>
      <Header title="Community Events">
        <Can I="create" a="Event">
          <Button
            onClick={() => {
              router.push(appRoutes.admin_events_new)
            }}
          >
            <Icons.plus className="w-4 h-4 mr-2" />
            New Event
          </Button>
        </Can>
      </Header>
      <DataTable searchKey="title" columns={eventColumns} data={events} />
    </>
  )
}

export default EventsClient
