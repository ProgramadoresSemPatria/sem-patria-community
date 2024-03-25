import { DefaultLayout } from '@/components/default-layout'
import Header from '@/components/header'
import { MentorshipSection } from './components/mentorship-section'

const Mentorship = () => {
  return (
    <DefaultLayout>
      <Header
        title="Mentorship"
        description="Browse all our community content."
      />
      <MentorshipSection />
    </DefaultLayout>
  )
}

export default Mentorship
