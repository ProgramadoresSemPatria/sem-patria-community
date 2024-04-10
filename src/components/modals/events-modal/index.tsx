import { EventsCalendar } from '@/components/events-calendar'
import { Modal } from '@/components/ui/modal'
import { Separator } from '@/components/ui/separator'
import { useEventModal } from '@/hooks/modal/use-event-modal'

const EventsModal = () => {
  const { isOpen, onClose } = useEventModal()

  return (
    <>
      <Modal
        title="Mentorship Events"
        description="Events that are happening in the mentorship program."
        isOpen={isOpen}
        onClose={onClose}
      >
        <Separator className="mb-4" />
        <EventsCalendar />
      </Modal>
    </>
  )
}

export default EventsModal
