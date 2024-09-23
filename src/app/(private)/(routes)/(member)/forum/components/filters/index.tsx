'use client'
import { Icons } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { useForumFilters } from './use-forum-filters'
import { Input } from '@/components/ui/input'
import { useDebounceSearch } from '@/hooks/shared/use-debounce-search'

export const orderByOptions = [
  {
    id: 'datenew',
    value: 'New in',
    icon: <Icons.arrowUp className="ml-auto h-4 w-4" />
  },
  {
    id: 'dateold',
    value: 'Old ones',
    icon: <Icons.arrowDown className="ml-auto h-4 w-4" />
  },
  {
    id: 'likes',
    value: 'Most likes',
    icon: <Icons.upVote className="ml-auto h-4 w-4" />
  }
]

const ForumFilters = () => {
  const {
    categories,
    openCategory,
    onOpenCategory,
    categoryName,
    searchParams,
    handleSetCategoryName,
    openOrderBy,
    onOpenOrderBy,
    router,
    orderBy,
    handleSetOrderBy,
    handleSelect,
    isLoadingCategories,
    search: searchQuery,
    handleSearch: handleSetSearchQuery
  } = useForumFilters()

  const { searchTerm: localSearchTerm, setSearchTerm: setLocalSearchTerm } =
    useDebounceSearch({
      initialValue: searchQuery,
      onSearch: handleSetSearchQuery
    })

  const categoryOptions =
    categories && categories.length > 0
      ? [
          {
            id: 'all',
            name: 'All'
          },
          ...categories
        ]
      : []

  const resetSearchTerm = () => {
    handleSetSearchQuery('')
    setLocalSearchTerm('')
  }

  return (
    <div className="flex flex-wrap py-2 gap-2 mb-4">
      <div className="flex-grow min-w-[200px]">
        <Input
          type="text"
          placeholder="🔎 Search posts..."
          value={localSearchTerm}
          onChange={e => {
            setLocalSearchTerm(e.target.value)
          }}
          className="w-full"
          clearable
        />
      </div>

      {isLoadingCategories ? (
        <Skeleton className="h-9 w-40 rounded-md" />
      ) : (
        <Popover open={openCategory} onOpenChange={onOpenCategory}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openCategory}
              className="flex w-fit items-center justify-between border-dashed hover:cursor-pointer gap-x-2"
            >
              <Icons.layers className=" h-4 w-4 shrink-0 opacity-50" />
              <span>Category</span>
              {categoryName && (
                <span className="text-xs text-muted-foreground">|</span>
              )}
              {categoryName && (
                <Badge className="bg-slate-900 hover:bg-slate-900 text-white">
                  {searchParams.get('category') || categoryName}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search category..." />
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {categoryOptions.map(category => (
                  <CommandItem
                    className="line-clamp-1"
                    key={category.name}
                    value={category.name}
                    onSelect={() => {
                      handleSetCategoryName(category.name)
                      onOpenCategory(false)
                      router.push(
                        `/forum?category=${category.name}${
                          searchParams.get('search')
                            ? `&search=${searchParams.get('search')}`
                            : ''
                        }${
                          searchParams.get('orderBy')
                            ? `&orderBy=${searchParams.get('orderBy')}`
                            : ''
                        }`
                      )
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        categoryName === category.name
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                    {category.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      )}

      <Popover open={openOrderBy} onOpenChange={onOpenOrderBy}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openOrderBy}
            className="flex w-fit justify-between border-dashed hover:cursor-pointer gap-x-2"
          >
            <Icons.arrowUpDown className="h-4 w-4 shrink-0 opacity-50" />
            <span>Order by</span>
            {orderBy && (
              <span className="text-xs text-muted-foreground">|</span>
            )}
            {orderBy && (
              <Badge className="bg-slate-900 hover:bg-slate-900 text-white">
                {orderBy}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandGroup>
              {orderByOptions.map(orderByOption => (
                <CommandItem
                  className="line-clamp-1"
                  key={orderByOption.id}
                  value={orderByOption.id}
                  onSelect={currentValue => {
                    handleSelect(currentValue)
                    onOpenOrderBy(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      orderBy === orderByOption.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  <span>{orderByOption.value}</span>
                  {orderByOption.icon}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <Button
        onClick={() => {
          handleSetCategoryName('All')
          handleSetOrderBy('')
          resetSearchTerm()
          router.push(`/forum?category=All`)
        }}
        variant="ghost"
        className="border-dashed border"
      >
        Reset
        <Icons.close className="ml-2" size={15} />
      </Button>
    </div>
  )
}

export default ForumFilters
