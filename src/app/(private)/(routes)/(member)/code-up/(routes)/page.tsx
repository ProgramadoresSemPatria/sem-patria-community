import Header from '@/components/header'
import { CodeUpContent } from '../components/code-up-content'

const CodeUp = () => {
  return (
    <div className="container pt-6 h-full">
      <Header title="Code Up" description="Inform the progress of the day." />
      <CodeUpContent />
    </div>
  )
}

export default CodeUp
