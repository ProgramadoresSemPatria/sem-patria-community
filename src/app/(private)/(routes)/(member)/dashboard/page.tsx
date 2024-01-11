import Header from '@/components/header'
import { ChallengeCommitCard } from './components/challenge-commit-card'

export default function Dashboard() {
  return (
    <div className="container pt-6">
      <Header title="Dashboard" />
      <div className="flex flex-col">
        <div>
          <h1 className="text-3xl font-bold">Mentorship list</h1>
        </div>
        <div className="grid grid-cols-2 gap-x-8">
          <ChallengeCommitCard />
          <ChallengeCommitCard />
        </div>
      </div>
    </div>
  )
}
