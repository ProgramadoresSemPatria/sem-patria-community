import { toast } from '@/components/ui/use-toast'
import { useNote } from '@/hooks/note/use-note'
import { useNoteStore } from '@/hooks/note/use-note-store'
import { type Note } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type UseNoteHeaderProps = {
  note: Note
}

export const useNoteHeader = ({ note }: UseNoteHeaderProps) => {
  const router = useRouter()
  const { title, content } = useNoteStore()
  const { useSaveChangesNote } = useNote()
  const [isPublicNote, setIsPublicNote] = useState(note.isPublic ?? true)

  const { mutateAsync: onSaveChangesNote, isPending } = useSaveChangesNote(
    note.id,
    {
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'Your changes have been saved successfully,'
        })
        router.refresh()
      },
      onError: err => {
        console.error('Error saving changes', err)
        toast({
          title: 'Something went wrong',
          description: 'Please try again.',
          variant: 'destructive'
        })
      }
    }
  )

  const onChangeNoteVisibility = () => {
    setIsPublicNote(prev => !prev)
  }

  const handleSaveChanges = async () => {
    if (!note.id) return

    if (title === '') {
      toast({
        title: 'Title is required',
        description: 'Please enter a title for your note'
      })
      return
    }

    const props = {
      title: title ?? note.title,
      content,
      isPublic: isPublicNote
    }

    await onSaveChangesNote(props)
  }

  return {
    isPending,
    router,
    handleSaveChanges,
    isPublicNote,
    onChangeNoteVisibility
  }
}
