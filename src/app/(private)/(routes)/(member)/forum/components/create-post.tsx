'use client'
import CreatePostModal from '@/components/modals/create-post-modal'
import { Input } from '@/components/ui/input'
import useCreatePostModalStore from '@/hooks/modal/use-create-post'
import React from 'react'

function CreatePostComponent() {
  const { isOpen, onOpen } = useCreatePostModalStore()

  return (
    <div>
      <Input
        placeholder="What is on your mind?"
        onFocus={() => {
          onOpen()
        }}
      />
      {isOpen && <CreatePostModal />}
    </div>
  )
}

export default CreatePostComponent
