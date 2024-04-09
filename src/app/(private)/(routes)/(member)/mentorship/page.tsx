import { DefaultLayout } from '@/components/default-layout'
import Header from '@/components/header'
import { MentorshipSections } from './components/mentorship-sections'

const Mentorship = () => {
  return (
    <DefaultLayout>
      <Header title="Mentorship" />
      <MentorshipSections />
    </DefaultLayout>
  )
}

export default Mentorship
