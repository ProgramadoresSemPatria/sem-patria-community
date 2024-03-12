import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { appRoutes } from '@/lib/constants'
import { Comments } from './components/comments/comments'
import { MentorshipHeader } from './components/mentorship-header'
import MentorshipTab from './components/mentorship-tab'

const ProgramPage = ({ params }: { params: { program: string } }) => {
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
            <Breadcrumb className="pl-4 pt-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href={appRoutes.mentorship}>
                    Mentorship
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {params.program.replace(/-/g, ' ').toUpperCase()}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
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
