import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  CourseFilterAvailability,
  CourseFilterLevels,
  useCourseFilterOptions
} from '@/hooks/course/use-course-filter-options'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()

  return (
    <div>
      <div className="flex gap-6 justify-start items-center dark:text-gray-100 __className_f56873">
        <Select
          value={
            filterOptions.levels.length > 0
              ? filterOptions.levels.join(',')
              : ''
          }
          onValueChange={value => {}}
        >
          <SelectTrigger>
            <SelectValue
              placeholder="Select levels"
              defaultValue="Select levels"
            >
              {filterOptions.levels.length > 0
                ? `${filterOptions.levels.length} levels selected`
                : 'Select levels'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Object.entries({
              beginner: CourseFilterLevels.Beginner,
              intermediate: CourseFilterLevels.Intermediate,
              advanced: CourseFilterLevels.Advanced
            }).map(([label, level]) => (
              <div key={label} className="flex items-center space-x-2">
                <Checkbox
                  key={label}
                  checked={filterOptions.levels.includes(level)}
                  onCheckedChange={async () => {
                    navigateToLevelFilter(level)
                    await onSelectFilterLevel(level)
                    router.push(
                      `?category=${category}&level=${navigateToLevelFilter(
                        level
                      )}&availability=${filterOptions.availability.join(',')}`
                    )
                  }}
                  value={level}
                />
                <Label className="text-sm capitalize">{label}</Label>
              </div>
            ))}
          </SelectContent>
        </Select>

        <div className="flex flex-col gap-y-2 w-full">
          <div className="flex items-center space-x-2 w-full">
            <Link
              className="h-4 flex items-center"
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
                className="border-grey-500"
              />
            </Link>
            <Label className="text-sm w-full whitespace-nowrap dark:group-hover:text-gray-100 transition-color">
              Free courses
            </Label>
          </div>
        </div>
        {showClearButton && (
          <Button onClick={clearAllFilters} variant="outline" className="w-min">
            Clear all <Icons.close className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
