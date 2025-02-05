import { Icons } from '@/components/icons'
import { ComboboxInput } from '@headlessui/react'
import { type Dispatch, type SetStateAction } from 'react'

interface SearchInputProps {
  isLoading: boolean
  setSearchTerm: Dispatch<SetStateAction<string>>
}

export const SearchInput = ({ isLoading, setSearchTerm }: SearchInputProps) => (
  <div className="relative">
    {isLoading ? (
      <Icons.loaderCircle
        className="absolute left-3 top-1/3 animate animate-spin h-4 w-4 text-gray-900 dark:text-gray-100"
        aria-hidden="true"
      />
    ) : (
      <Icons.search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-900 dark:text-gray-100"
        aria-hidden="true"
      />
    )}
    <ComboboxInput
      autoFocus
      maxLength={300}
      className="w-full h-12 pl-11 pr-4 text-sm bg-white dark:bg-card text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-t-xl focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-secondary focus:border-transparent transition-colors duration-200"
      placeholder="Search..."
      onChange={event => {
        setSearchTerm(event.target.value)
      }}
    />
  </div>
)
