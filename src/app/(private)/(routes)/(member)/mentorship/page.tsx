import { DefaultLayout } from '@/components/default-layout'
import Header from '@/components/header'
import { MentorshipSections } from './components/mentorship-sections'

const Mentorship = () => {
  return (
    <DefaultLayout>
      <Header
        title="Mentorship"
        description="Browse all our community content."
      />
      <MentorshipSections />
    </DefaultLayout>
  )
}

export default Mentorship
