import React from 'react'
import useCreatePostModalStore from '@/hooks/modal/use-create-post'
import { Modal } from '@/components/ui/modal'
import { RichTextInput } from '@/app/(private)/(routes)/(member)/forum/components/rich-text-input-post'

const CreatePostModal = () => {
  const { isOpen, onClose } = useCreatePostModalStore()

  return (
    <>
      <Modal
        title="Create Post"
        description="What is on your mind?"
        isOpen={isOpen}
        onClose={onClose}
      >
        <RichTextInput />
      </Modal>
    </>
  )
}

export default CreatePostModal
