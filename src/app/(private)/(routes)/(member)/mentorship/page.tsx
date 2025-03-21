import { DefaultLayout } from '@/components/default-layout'
import Header from '@/components/header'
import { MentorshipSections } from './components/mentorship-sections'
import { getMentorships } from '@/actions/mentorship/get-mentorships'

const Mentorship = async () => {
  const data = await getMentorships()
  return (
    <DefaultLayout>
      <Header title="Mentorship" />
      <MentorshipSections data={data} />
    </DefaultLayout>
  )
}

export default Mentorship
