import { DefaultLayout } from '@/components/default-layout'
import Header from '@/components/header'
import { CodeUpBackupButton } from '@/components/code-up-backup-button'
import { CodeUpContent } from './components/code-up-content'
import { CreateNoteButton } from './components/create-note-button'

const CodeUpPage = () => {
  return (
    <DefaultLayout className="h-full">
      <Header title="Code Up">
        <CodeUpBackupButton />
        <CreateNoteButton />
      </Header>
      <CodeUpContent />
    </DefaultLayout>
  )
}

export default CodeUpPage
