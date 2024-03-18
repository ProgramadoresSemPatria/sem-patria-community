import { DefaultLayout } from '@/components/default-layout'
import Header from '@/components/header'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import ClassroomContent from './components/classroom-content'

const AdminClassroomPage = () => {
  const tabsOptions = [
    {
      id: 'classroom',
      content: <ClassroomContent />
    },
    {
      id: 'videos',
      content: <div>Coming Soon</div>
    }
  ]

  return (
    <DefaultLayout>
      <Header
        title="Classroom"
        description="Manage the projects and videos of the community."
      />
      <Separator className="my-6" />
      <Tabs defaultValue={tabsOptions[0].id} className="w-full">
        <TabsList className="grid grid-cols-2 w-1/3 mb-6">
          <TabsTrigger value="classroom">
            <Link
              href={{
                query: { tabSelected: 'classroom' }
              }}
              className="appearance-none w-full"
            >
              Classroom
            </Link>
          </TabsTrigger>
          <TabsTrigger value="videos">
            <Link
              href={{
                query: { tabSelected: 'videos' }
              }}
              className="appearance-none w-full"
            >
              Videos
            </Link>
          </TabsTrigger>
        </TabsList>
        {tabsOptions.map(value => (
          <TabsContent key={value.id} value={value.id}>
            {value.content}
          </TabsContent>
        ))}
      </Tabs>
    </DefaultLayout>
  )
}

export default AdminClassroomPage
