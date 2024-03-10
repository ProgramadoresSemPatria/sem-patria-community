import { DefaultLayout } from '@/components/default-layout'
import Header from '@/components/header'
import { ChallengeCommitCard } from './components/challenge-commit-card'
import { EventsCalendar } from './components/events-calendar/events-calendar'
import MentorshipList from './components/mentorship-list'

export default function Dashboard() {
  return (
    <DefaultLayout>
      <Header title="Dashboard" />
      <div className="flex flex-col">
        <MentorshipList />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8">
          <ChallengeCommitCard />
          <EventsCalendar />
        </div>
      </div>
    </DefaultLayout>
  )
}
