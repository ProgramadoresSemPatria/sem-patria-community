import { Icons } from '@/components/icons'
import { Input } from '@/components/ui/input'
import { type ChangeEvent } from 'react'

interface SearchInputProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onClear: () => void
  isLoading: boolean
}

export const SearchInput = ({
  value,
  onChange,
  onClear,
  isLoading
}: SearchInputProps) => (
  <div className="mb-6 relative">
    <Input
      type="text"
      className="w-full pr-10 bg-white/5 backdrop-blur-sm transition-all duration-300 focus:scale-[1.01] focus:shadow-lg"
      placeholder="Search users..."
      value={value}
      onChange={onChange}
    />
    {value && (
      <button
        onClick={onClear}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
      >
        <Icons.close className="h-4 w-4" />
      </button>
    )}
    {isLoading && value && (
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
        <Icons.loader className="h-4 w-4 animate-spin text-primary" />
      </div>
    )}
  </div>
)
