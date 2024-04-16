import { DefaultLayout } from '@/components/default-layout'
import Header from '@/components/header'
import { PublicNotesCard } from './components/public-notes-card'

export default function Dashboard() {
  return (
    <DefaultLayout>
      <Header title="Dashboard" />
      <div className="flex flex-col w-full h-full">
        <div className="grid grid-cols-2 gap-x-8 auto-rows-min">
          <PublicNotesCard />
          <PublicNotesCard />
        </div>
      </div>
    </DefaultLayout>
  )
}
