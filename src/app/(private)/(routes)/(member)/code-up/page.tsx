import { DefaultLayout } from '@/components/default-layout'
import Header from '@/components/header'
import { CodeUpContent } from './components/code-up-content'
import { CreateNoteButton } from './components/create-note-button'

const CodeUpPage = () => {
  return (
    <DefaultLayout className="h-full">
      <Header title="Code Up">
        <CreateNoteButton />
      </Header>
      <CodeUpContent />
    </DefaultLayout>
  )
}

export default CodeUpPage
