'use client'

import { Icons } from '@/components/icons'
import EditPostModal from '@/components/modals/edit-post-modal'
import { Button } from '@/components/ui/button'
import useEditPostModalStore from '@/hooks/modal/use-edit-post'
import { type Prisma } from '@prisma/client'

interface EditPostButtonProps {
  postId: string
  title: string
  content: Prisma.JsonValue
  categoryId: string
}

const EditPostButton = ({
  postId,
  title,
  content,
  categoryId
}: EditPostButtonProps) => {
  const { onOpen, isOpen } = useEditPostModalStore()
  return (
    <>
      <Button
        onClick={onOpen}
        className="ml-auto gap-1"
        size="sm"
        variant="ghost"
      >
        Update <Icons.edit className="w-3 h-3" />
      </Button>
      {isOpen && (
        <EditPostModal
          postId={postId}
          title={title}
          content={content}
          categoryId={categoryId}
        />
      )}
    </>
  )
}

export default EditPostButton
