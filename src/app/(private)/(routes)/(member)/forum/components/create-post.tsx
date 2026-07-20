'use client'
import CreatePostModal from '@/components/modals/create-post-modal'
import { Input } from '@/components/ui/input'
import useCreatePostModalStore from '@/hooks/modal/use-create-post'
import { Can } from '@/hooks/use-ability'
import { IS_READ_ONLY } from '@/lib/read-only'

function CreatePostComponent() {
  const { isOpen, onOpen } = useCreatePostModalStore()

  return (
    <Can I="create" a="Post">
      <div className="flex items-center justify-between py-2">
        <Input
          placeholder="🧠 What is on your mind?"
          disabled={IS_READ_ONLY}
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
