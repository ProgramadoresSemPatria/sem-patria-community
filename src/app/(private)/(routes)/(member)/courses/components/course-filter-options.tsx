import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export const CourseFilterOptions = () => {
  return (
    <div className="hidden lg:block">
      <div className="flex flex-col gap-6 text-gray-100 __className_f56873">
        <div className="flex justify-between gap-3 items-center">
          <h3 className="text-lg text-gray-100 font-bold">
            Filter the content
          </h3>
        </div>
        <Button variant="outline" className="w-min">
          Clear all <Icons.close className="ml-2 h-4 w-4" />
        </Button>
        <div className="flex flex-col gap-y-2">
          <h4 className="text-sm text-gray-300 font-bold">Skill Level</h4>
          <div className="flex items-center space-x-2">
            <Checkbox id="skill_beginner" />
            <Label
              htmlFor="skill_beginner"
              className="text-sm text-gray-300 group-hover:text-gray-100 transition-color"
            >
              Beginner
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="skill_intermediate" />
            <Label
              htmlFor="skill_intermediate"
              className="text-sm text-gray-300 group-hover:text-gray-100 transition-color"
            >
              Intermediate
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="skill_advanced" />
            <Label
              htmlFor="skill_advanced"
              className="text-sm text-gray-300 group-hover:text-gray-100 transition-color"
            >
              Advanced
            </Label>
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <h4 className="text-sm text-gray-300 font-bold">Paid</h4>
          <div className="flex items-center space-x-2">
            <Checkbox id="paid_true" />
            <Label
              htmlFor="paid_true"
              className="text-sm text-gray-300 group-hover:text-gray-100 transition-color"
            >
              Paid
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="paid_false" />
            <Label
              htmlFor="paid_false"
              className="text-sm text-gray-300 group-hover:text-gray-100 transition-color"
            >
              Free
            </Label>
          </div>
        </div>
      </div>
    </div>
  )
}
