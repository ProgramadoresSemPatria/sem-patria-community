import { DefaultLayout } from '@/components/default-layout'
import Header from '@/components/header'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import ClassroomContent from './components/classroom-content'
import ModuleContent from './components/classroom-module-content'

const AdminClassroomPage = () => {
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
        <TabsList className="w-auto mb-6">
          {tabsOptions.map(value => (
            <Link
              key={value.id}
              href={{
                query: { tabSelected: `${value.id}` }
              }}
            >
              <TabsTrigger value={value.id} className="w-full px-8">
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