import { Modal } from '@/components/ui/modal'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useFeedbackModal } from '@/hooks/use-feedback-modal'
import { FeedbackModalCourseContent } from './feedback-modal-course-content'

const FeedbackModal = () => {
  const { isOpen, onClose } = useFeedbackModal()

  const tabsOptions = [
    {
      id: 'course',
      content: <FeedbackModalCourseContent onClose={onClose} />
    },
    {
      id: 'soon',
      content: <div>Coming Soon</div>
    }
  ]

  return (
    <>
      <Modal
        title="Recommend a Content"
        description="Insert a recommendation for feed the content of the platform."
        isOpen={isOpen}
        onClose={onClose}
      >
        <Separator />
        <div className="flex flex-col gap-2 mt-4">
          <Tabs defaultValue={tabsOptions[0].id} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="course">Course</TabsTrigger>
              <TabsTrigger value="soon" disabled>
                Coming Soon
              </TabsTrigger>
            </TabsList>
            {tabsOptions.map(value => (
              <TabsContent key={value.id} value={value.id}>
                {value.content}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </Modal>
    </>
  )
}

export default FeedbackModal
