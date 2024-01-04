import { Modal } from '@/components/ui/modal'
import { useFeedbackModal } from '@/hooks/use-feedback-modal'
import { NewCourseForm } from '@/app/(private)/(routes)/admin/courses/[courseId]/components/new-course-form'
import { useQuery } from '@tanstack/react-query'
import { type AxiosResponse } from 'axios'
import { type Category } from '@prisma/client'
import { api } from '@/lib/api'

const FeedbackModal = () => {
  const { isOpen, onClose } = useFeedbackModal()
  const { data: categories, isLoading } = useQuery<AxiosResponse<Category[]>>({
    queryKey: ['categories'],
    queryFn: async () => await api.get(`/api/categories`)
  })
  return (
    <>
      {!isLoading && categories && (
        <Modal
          title="Create New Course"
          description="Add a new course to the community."
          isOpen={isOpen}
          onClose={onClose}
        >
          <NewCourseForm
            categories={categories.data}
            initialData={null}
            hasFeedback={true}
          />
        </Modal>
      )}
    </>
  )
}

export default FeedbackModal
