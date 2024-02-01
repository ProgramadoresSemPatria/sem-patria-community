'use client'
import { Icons } from '@/components/icons'
import { AlertModal } from '@/components/modals/alert-modal'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { toast } from '@/components/ui/use-toast'
import { useNote } from '@/hooks/note/use-note'
import { useNoteStore } from '@/hooks/note/use-note-store'
import { appRoutes } from '@/lib/constants'
import { type Note } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type NoteOptionsProps = {
  note: Note
}

export const NoteOptions = ({ note }: NoteOptionsProps) => {
  const router = useRouter()
  const { useDeleteNote } = useNote()

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const { onChangeTitle } = useNoteStore()

  const { mutateAsync: deleteNote, isPending: isDeleting } = useDeleteNote(
    note.id,
    {
      onSuccess: () => {
        router.refresh()
        onChangeTitle('')
      }
    }
  )

  const onDeleteNote = async () => {
    try {
      await deleteNote()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive'
      })
    } finally {
      setIsDeleteModalOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={isDeleteModalOpen}
        description="Are you sure you want to delete this note?"
        onClose={() => {
          setIsDeleteModalOpen(false)
        }}
        onConfirm={onDeleteNote}
        loading={isDeleting}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <span className="sr-only">Open menu</span>
            <Icons.spreadVertical className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              onChangeTitle(note.title)
              router.push(`${appRoutes.codeUp}/${note.id}`)
            }}
          >
            <Icons.arrowUpRighCircle className="mr-2 h-4 w-4" />
            View Note
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isDeleting}
            onClick={() => {
              setIsDeleteModalOpen(true)
            }}
          >
            {isDeleting ? (
              <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.trash className="mr-2 h-4 w-4" />
            )}
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
