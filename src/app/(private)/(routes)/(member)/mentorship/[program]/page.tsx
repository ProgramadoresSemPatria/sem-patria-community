import { Icons } from '@/components/icons'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { appRoutes } from '@/lib/constants'
import { Comments } from './components/comments'
import { MentorshipHeader } from './components/mentorship-header'
import MentorshipTab from './components/mentorship-tab'
import { useProgramPage } from './use-program-page'

const ProgramPage = ({ params }: { params: { program: string } }) => {
  const { formatTitle } = useProgramPage()

  return (
    <>
      <MentorshipHeader title={params.program} />
      <div className="overflow-auto">
        <div className="flex flex-col md:flex-row h-full box-border overflow-x-auto md:overflow-hidden">
          <div className="flex flex-col flex-1 flex-shrink-0 w-full md:overflow-y-auto transition-[height]">
            <iframe
              className="w-full h-[calc(80vh-80px)] rounded-md"
              src="https://www.youtube.com/watch?v=ADJKbuayubE"
            />
            <div className="w-full flex justify-between items-center pl-4 pt-2">
              <Breadcrumb className="p-0">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={appRoutes.mentorship}>
                      Mentorship
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {formatTitle(params.program)}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <Button variant="ghost" className="flex items-center">
                <Icons.check className="h-4 w-4 mr-2" color="#34d399" /> Mark as
                watched
              </Button>
            </div>
            <h1 className="p-4 font-bold text-2xl">
              Como montar seu curriculo
            </h1>
            <Comments />
          </div>
          <MentorshipTab title={params.program} />
        </div>
      </div>
    </>
  )
}

export default ProgramPage
