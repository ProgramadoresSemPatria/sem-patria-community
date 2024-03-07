import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  CourseFilterAvailability,
  CourseFilterLevels,
  useCourseFilterOptions
} from '@/hooks/course/use-course-filter-options'
import Link from 'next/link'

export const CourseFilterOptions = () => {
  const {
    clearAllFilters,
    showClearButton,
    onSelectFilterLevel,
    onSelectFilterAvailability,
    filterOptions,
    category,
    navigateToLevelFilter,
    navigateToAvailabilityFilter
  } = useCourseFilterOptions()

  return (
    <div className="hidden lg:block">
      <div className="flex flex-col gap-6 text-gray-100 __className_f56873">
        <div className="flex justify-between gap-3 items-center">
          <h3 className="text-lg text-gray-100 font-bold">
            Filter the content
          </h3>
        </div>
        {showClearButton && (
          <Button onClick={clearAllFilters} variant="outline" className="w-min">
            Clear all <Icons.close className="ml-2 h-4 w-4" />
          </Button>
        )}

        <div className="flex flex-col gap-y-2">
          <h4 className="text-sm text-gray-300 font-bold">Skill Level</h4>
          <div className="flex items-center space-x-2">
            <Link
              className="h-4"
              href={{
                query: {
                  category,
                  level: navigateToLevelFilter(CourseFilterLevels.Beginner),
                  availability: filterOptions.availability.join(',')
                }
              }}
            >
              <Checkbox
                checked={filterOptions.levels.includes(
                  CourseFilterLevels.Beginner
                )}
                onCheckedChange={async () => {
                  await onSelectFilterLevel(CourseFilterLevels.Beginner)
                }}
              />
            </Link>
            <Label className="text-sm text-gray-300 group-hover:text-gray-100 transition-color">
              Beginner
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              className="h-4"
              href={{
                query: {
                  category,
                  level: navigateToLevelFilter(CourseFilterLevels.Intermediate),
                  availability: filterOptions.availability.join(',')
                }
              }}
            >
              <Checkbox
                checked={filterOptions.levels.includes(
                  CourseFilterLevels.Intermediate
                )}
                onCheckedChange={async () => {
                  await onSelectFilterLevel(CourseFilterLevels.Intermediate)
                }}
              />
            </Link>
            <Label className="text-sm text-gray-300 group-hover:text-gray-100 transition-color">
              Intermediate
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              className="h-4"
              href={{
                query: {
                  category,
                  level: navigateToLevelFilter(CourseFilterLevels.Advanced),
                  availability: filterOptions.availability.join(',')
                }
              }}
            >
              <Checkbox
                checked={filterOptions.levels.includes(
                  CourseFilterLevels.Advanced
                )}
                onCheckedChange={async () => {
                  await onSelectFilterLevel(CourseFilterLevels.Advanced)
                }}
              />
            </Link>
            <Label className="text-sm text-gray-300 group-hover:text-gray-100 transition-color">
              Advanced
            </Label>
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <h4 className="text-sm text-gray-300 font-bold">Availability</h4>
          <div className="flex items-center space-x-2">
            <Link
              className="h-4"
              href={{
                query: {
                  category,
                  level: filterOptions.levels.join(','),
                  availability: navigateToAvailabilityFilter(
                    CourseFilterAvailability.Free
                  )
                }
              }}
            >
              <Checkbox
                checked={filterOptions.availability.includes(
                  CourseFilterAvailability.Free
                )}
                onCheckedChange={async () => {
                  await onSelectFilterAvailability(
                    CourseFilterAvailability.Free
                  )
                }}
              />
            </Link>
            <Label className="text-sm text-gray-300 group-hover:text-gray-100 transition-color">
              Only Free
            </Label>
          </div>
        </div>
      </div>
    </div>
  )
}
