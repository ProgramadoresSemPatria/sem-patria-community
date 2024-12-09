'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Icons } from '../icons'
import MainLogo from '../main-logo'
import { EventsButton } from './events-button'
import { FeedbackButton } from './feedback-button'
import { LogoutButton } from './logout-button'
import NotificationsButton from './notifications-button/index'
import { SidebarTrigger } from '../ui/sidebar'
import { useIsMobile } from '@/hooks/use-mobile'
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  DialogBackdrop
} from '@headlessui/react'
import { Search } from 'lucide-react'
import { useDebounceSearch } from '@/hooks/shared/use-debounce-search'
import { Skeleton } from '../ui/skeleton'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'

interface SearchResult {
  id: string
  type: string
  description: string
  url: string
}

const feedbackLink =
  'https://docs.google.com/forms/d/e/1FAIpQLSc_UTMhjo2-HH6XovqWajs5RKj_2LQMCq2kz8itV-NcheU8oA/viewform'

const TopBar = () => {
  const { isMobile } = useIsMobile()
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])

  const [isLoading, setIsLoading] = useState(false)

  const isMac =
    typeof window !== 'undefined' &&
    window.navigator.userAgent.toLowerCase().includes('mac')

  const handleSearch = useCallback(async (value: string) => {
    if (!value.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/search?keyword=${encodeURIComponent(value)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      setSearchResults(data)
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const { searchTerm, setSearchTerm } = useDebounceSearch({
    initialValue: '',
    delay: 400,
    onSearch: handleSearch
  })

  // Add keyboard shortcut handler
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(open => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => {
      document.removeEventListener('keydown', down)
    }
  }, [])

  return (
    <>
      <div className="flex h-[60px] items-center justify-end border-b border-slate-6 pl-6">
        {isMobile && <SidebarTrigger className="mr-4" />}
        <MainLogo isMobile />
        <div className="flex items-center gap-4">
          <Button
            type="button"
            onClick={() => {
              setOpen(true)
            }}
            variant="outline"
            size={isMobile ? 'icon' : 'default'}
            className="flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            {!isMobile && <span>Search</span>}
            {!isMobile && (
              <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                {isMac ? <span className="text-xs">⌘</span> : 'Ctrl'}K
              </kbd>
            )}
          </Button>
          <FeedbackButton isMobile={isMobile} />
          <Button size={isMobile ? 'icon' : 'default'} variant="outline">
            <Link
              href={feedbackLink}
              target="_blank"
              className="flex items-center gap-x-2"
            >
              {!isMobile && <span>Give your feedback</span>}
              <Icons.redirect className="w-5 h-5 text-violet-600" />
            </Link>
          </Button>
          <NotificationsButton />
          <EventsButton isMobile={isMobile} />
          <div className="hidden md:flex">
            <LogoutButton />
          </div>
        </div>
      </div>

      <Dialog
        id="semantic-search-dialog"
        open={open}
        onClose={() => {
          setOpen(false)
          setTimeout(() => {
            setSearchTerm('')
            setSearchResults([])
          }, 600)
        }}
        className="relative z-50"
      >
        <DialogBackdrop
          transition
          className="fixed z-40 inset-0 bg-background/80 backdrop-blur-sm transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-50 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <DialogPanel
            transition
            className="mx-auto max-w-xl transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-2xl ring-1 ring-black/5 transition-all data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <Combobox
              onChange={(item: SearchResult) => {
                if (item) {
                  router.push(item.url)
                  setOpen(false)
                  setSearchTerm('')
                  setSearchResults([])
                }
              }}
            >
              <div className="relative">
                <ComboboxInput
                  autoFocus
                  className="w-full h-12 pl-11 pr-4 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-t-xl focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 focus:border-transparent transition-colors duration-200"
                  placeholder="Type for search..."
                  onChange={event => {
                    setSearchTerm(event.target.value)
                  }}
                />
                <MagnifyingGlassIcon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500"
                  aria-hidden="true"
                />
              </div>

              {isLoading ? (
                <div className="space-y-4 py-4 px-3 bg-gray-50 dark:bg-gray-700">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-10 w-10 rounded-lg bg-gray-200 dark:bg-gray-600" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-[200px] bg-gray-200 dark:bg-gray-600" />
                        <Skeleton className="h-4 w-[160px] bg-gray-200 dark:bg-gray-600" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {searchTerm === '' && searchResults.length === 0 && (
                    <div className="text-center px-6 py-14 sm:px-14">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-text-search mx-auto w-8 h-8 text-gray-400"
                      >
                        <path d="M21 6H3" />
                        <path d="M10 12H3" />
                        <path d="M10 18H3" />
                        <circle cx="17" cy="15" r="3" />
                        <path d="m21 19-1.9-1.9" />
                      </svg>
                      <h2 className="mt-2 text-base font-semibold text-gray-900">
                        Search
                      </h2>
                      <h6 className="mt-1 text-sm text-gray-500">
                        Posts and/or users.
                      </h6>
                    </div>
                  )}

                  {searchTerm !== '' && searchResults.length === 0 && (
                    <h6 className="font-medium px-6 py-14 text-center text-sm sm:px-14">
                      No results found.
                    </h6>
                  )}

                  {searchResults.length > 0 && (
                    <ComboboxOptions
                      static
                      className="p-3 space-y-1 max-h-96 transform-gpu overflow-y-auto py-3 bg-white dark:bg-gray-800"
                    >
                      {searchResults.map(item => (
                        <ComboboxOption
                          key={item.id}
                          value={item}
                          className="group rounded-lg flex cursor-pointer select-none items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                        >
                          <div
                            className={cn(
                              'flex h-10 w-10 flex-none items-center justify-center rounded-lg mr-3',
                              item.type === 'Forum'
                                ? 'bg-indigo-500'
                                : 'bg-purple-500'
                            )}
                          >
                            {item.type === 'Forum' ? (
                              <Icons.forum
                                className="w-5 h-5 text-white"
                                aria-hidden="true"
                              />
                            ) : (
                              <Icons.user
                                className="w-5 h-5 text-white"
                                aria-hidden="true"
                              />
                            )}
                          </div>
                          <div className="flex-auto">
                            <p className="font-semibold text-gray-900 dark:text-gray-100">
                              {item.type}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {item.description}
                            </p>
                          </div>
                          <Icons.arrowRight
                            className="ml-3 h-5 w-5 flex-none text-gray-400 dark:text-gray-500 "
                            aria-hidden="true"
                          />
                        </ComboboxOption>
                      ))}
                    </ComboboxOptions>
                  )}
                </>
              )}
            </Combobox>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default TopBar
