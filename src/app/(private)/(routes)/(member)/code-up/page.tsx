import { DefaultLayout } from '@/components/default-layout'
import Header from '@/components/header'
import { Separator } from '@/components/ui/separator'
import { CodeUpContent } from './components/code-up-content'
import { CreateNoteButton } from './components/create-note-button'

const CodeUpPage = () => {
  return (
    <DefaultLayout className="h-full">
      <div className="flex items-center justify-between">
        <Header title="Code Up" description="Inform the progress of the day." />
        <CreateNoteButton />
      </div>
      <Separator className="my-4" />
      <CodeUpContent />
    </DefaultLayout>
  )
}

export default CodeUpPage
