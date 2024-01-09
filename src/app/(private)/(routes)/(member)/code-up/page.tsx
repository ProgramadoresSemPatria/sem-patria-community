import Header from '@/components/header'
import { Separator } from '@/components/ui/separator'
import { CodeUpContent } from './components/code-up-content'

const CodeUpPage = () => {
  return (
    <div className="container pt-6 h-full">
      <Header title="Code Up" description="Inform the progress of the day." />
      <Separator className="my-4" />
      <CodeUpContent />
    </div>
  )
}

export default CodeUpPage
