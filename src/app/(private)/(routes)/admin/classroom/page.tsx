import { DefaultLayout } from '@/components/default-layout'
import Header from '@/components/header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import ClassroomContent from './components/classroom-content'
import ModuleContent from './components/classroom-module-content'
import VideoContent from './components/classroom-video-content'

const AdminClassroomPage = ({
  searchParams
}: {
  searchParams?: Record<string, string | string[]>
}) => {
  const tabSelected = searchParams?.tabSelected as string

  const tabsOptions = [
    {
      id: 'classroom',
      content: <ClassroomContent />
    },
    {
      id: 'modules',
      content: <ModuleContent />
    },
    {
      id: 'videos',
      content: <VideoContent />
    }
  ]

  return (
    <DefaultLayout>
      <Header title="Classroom" />
      <Tabs defaultValue={tabSelected || tabsOptions[0].id} className="w-full">
        <TabsList className="w-auto mb-6">
          {tabsOptions.map(value => (
            <Link
              key={value.id}
              href={{
                query: { tabSelected: `${value.id}` }
              }}
            >
              <TabsTrigger
                data-testid={value.id}
                value={value.id}
                className="w-full px-8"
              >
                {value.id.slice(0, 1).toUpperCase() + value.id.slice(1)}
              </TabsTrigger>
            </Link>
          ))}
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
