import { DefaultLayout } from '@/components/default-layout'
import '@xyflow/react/dist/style.css'
import { TreeMap } from './components/TreeMap'

const CodeBreakersPage = () => {
  return (
    <DefaultLayout className="max-w-none w-full h-[calc(100vh-4rem)] mx-0 px-0 pt-0 relative">
      <TreeMap />
    </DefaultLayout>
  )
}

export default CodeBreakersPage
