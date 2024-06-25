import { EditPostForm } from '@/app/(private)/(routes)/(member)/forum/components/edit-post-form'
import { Modal } from '@/components/ui/modal'
import useEditPostModalStore from '@/hooks/modal/use-edit-post'
import { type JsonValue } from '@prisma/client/runtime/library'

interface EditPostModalProps {
  postId: string
  title: string
  content: JsonValue
  categoryId: string
}

const EditPostModal = ({
  postId,
  title,
  content,
  categoryId
}: EditPostModalProps) => {
  const { isOpen, onClose } = useEditPostModalStore()

  return (
    <Modal
      title="Edit Post"
      description=""
      isOpen={isOpen}
      onClose={onClose}
      className="min-w-fit"
    >
      <EditPostForm
        postId={postId}
        initialValues={{
          title,
          content,
          categoryId
        }}
      />
    </Modal>
  )
}

export default EditPostModal
