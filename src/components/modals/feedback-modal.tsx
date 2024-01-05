import { Modal } from '@/components/ui/modal'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useFeedbackModal } from '@/hooks/use-feedback-modal'
import { useCallback, useState, type ReactNode } from 'react'
import { Label } from '../ui/label'
import { FeedbackModalCategoryContent } from './components/feedback-modal-category-content'
import { FeedbackModalCourseContent } from './components/feedback-modal-course-content'

const FeedbackModal = () => {
  const { isOpen, onClose } = useFeedbackModal()
  const [selectValue, setSelectValue] = useState<string>()

  const handleSetSelectValue = useCallback((value: string) => {
    setSelectValue(value)
  }, [])

  const feedbackContent = useCallback(() => {
    if (!selectValue) return

    const content: Record<string, ReactNode> = {
      course: (
        <FeedbackModalCourseContent
          onClose={onClose}
          handleSetSelectValue={handleSetSelectValue}
        />
      ),
      category: <FeedbackModalCategoryContent onClose={onClose} />
    }

    return content[selectValue]
  }, [handleSetSelectValue, onClose, selectValue])

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
          <Label>Recommendation</Label>
          <Select
            disabled={false}
            onValueChange={value => {
              setSelectValue(value)
            }}
            value={selectValue}
            defaultValue={selectValue}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select a Content" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="course">Course</SelectItem>
              <SelectItem value="category">Category</SelectItem>
            </SelectContent>
          </Select>
          <Separator className="my-2" />
          {feedbackContent()}
        </div>
      </Modal>
    </>
  )
}

export default FeedbackModal
