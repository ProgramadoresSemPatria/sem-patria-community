import { RichTextInput } from '@/app/(private)/(routes)/(member)/forum/components/rich-text-input-post'
import { Modal } from '@/components/ui/modal'
import useCreatePostModalStore from '@/hooks/modal/use-create-post'

const CreatePostModal = () => {
  const { isOpen, onClose } = useCreatePostModalStore()

  return (
    <Modal
      title="Create Post"
      description="What is on your mind?"
      isOpen={isOpen}
      onClose={onClose}
      className="min-w-fit"
    >
      <RichTextInput />
    </Modal>
  )
}

export default CreatePostModal
