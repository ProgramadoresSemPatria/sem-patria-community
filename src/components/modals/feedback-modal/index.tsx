import { Modal } from '@/components/ui/modal'
import { Separator } from '@/components/ui/separator'
import { useFeedbackModal } from '@/hooks/modal/use-feedback-modal'
import { FeedbackModalCourseContent } from './feedback-modal-course-content'

const FeedbackModal = () => {
  const { isOpen, onClose } = useFeedbackModal()

  return (
    <Modal
      title="Recommend a Content"
      description="Share your suggestions for new content you'd like to see on the platform."
      isOpen={isOpen}
      onClose={onClose}
    >
      <Separator />
      <div className="flex flex-col gap-2">
        <FeedbackModalCourseContent onClose={onClose} />
      </div>
    </Modal>
  )
}

export default FeedbackModal
