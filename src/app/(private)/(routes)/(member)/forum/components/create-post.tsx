'use client'
import CreatePostModal from '@/components/modals/create-post-modal'
import { Input } from '@/components/ui/input'
import useCreatePostModalStore from '@/hooks/modal/use-create-post'
import { Can } from '@/hooks/use-ability'

function CreatePostComponent() {
  const { isOpen, onOpen } = useCreatePostModalStore()

  return (
    <Can I="create" a="Post">
      <div className="flex items-center justify-between py-2">
        <Input
          placeholder="🧠 What is on your mind?"
          onFocus={() => {
            onOpen()
          }}
        />
        {isOpen && <CreatePostModal />}
      </div>
    </Can>
  )
}

export default CreatePostComponent
