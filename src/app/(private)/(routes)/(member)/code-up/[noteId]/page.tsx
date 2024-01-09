import { appRoutes } from '@/lib/constants'
import prismadb from '@/lib/prismadb'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { NoteContent } from './components/note-content'
import { NoteHeader } from './components/note-header'

const NotePage = async ({ params }: { params: { noteId: string } }) => {
  const user = await currentUser()

  if (!user) return redirect(appRoutes.root)

  const note = await prismadb.note.findUnique({
    where: {
      id: params.noteId,
      userId: user.id
    }
  })

  if (!note) return redirect(appRoutes.codeUp)

  return (
    <>
      <Suspense>
        <div className="container pt-6 h-full">
          <NoteHeader note={note} />
          <NoteContent note={note} />
        </div>
      </Suspense>
    </>
  )
}

export default NotePage
