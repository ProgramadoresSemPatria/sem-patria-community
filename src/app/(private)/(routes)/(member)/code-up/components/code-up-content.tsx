import { appRoutes } from '@/lib/constants'
import prismadb from '@/lib/prismadb'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { EmptyNotes } from './empty-notes'
import { NotesList } from './notes-list'
import { SkeletonNoteList } from './skeleton-note-list'

export const CodeUpContent = async () => {
  const user = await currentUser()

  if (!user) {
    return redirect(appRoutes.root)
  }

  const notes = await prismadb.note.findMany({
    where: {
      userId: user.id
    }
  })

  return (
    <Suspense fallback={<SkeletonNoteList />}>
      <div className="max-h-[calc(100%-5rem)] h-full">
        {notes.length > 0 ? <NotesList notes={notes} /> : <EmptyNotes />}
      </div>
    </Suspense>
  )
}
