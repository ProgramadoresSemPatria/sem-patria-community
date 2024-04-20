import React from 'react'
import { RichTextInput } from '@/components/rich-text-input'
import useCreatePostModalStore from '@/hooks/modal/use-create-post'
import { Modal } from '@/components/ui/modal'

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
