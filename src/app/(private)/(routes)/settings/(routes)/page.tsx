import Header from '@/components/header'
import { Separator } from '@/components/ui/separator'
import { PersonalInfo } from './components/personal-info'
import { MembersList } from './components/members-list'

const SettingsPage = () => {
  return (
    <>
      <PersonalInfo />
      <Separator className="my-6" />
      <Header
        title="Members of community"
        description="All members of this community and their levels."
      />
      <MembersList />
    </>
  )
}

export default SettingsPage
