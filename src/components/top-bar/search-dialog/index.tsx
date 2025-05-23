import { useRouter } from 'next/navigation'
import {
  Combobox,
  Dialog,
  DialogPanel,
  DialogBackdrop
} from '@headlessui/react'
import { useDebounceSearch } from '@/hooks/shared/use-debounce-search'
import useSearch from '@/hooks/search/use-search'
import { type SearchDialogResult } from '@/hooks/search/types'
import { SearchInput } from './search-input'
import { SearchResults } from './search-results'
import { useEventModal } from '@/hooks/modal/use-event-modal'
import { toast } from '@/components/ui/use-toast'
import type { FC } from 'react'

interface SearchDialogProps {
  isOpen: boolean
  onClose: () => void
  isMac: boolean
}

const SearchDialog: FC<SearchDialogProps> = ({ isOpen, onClose }) => {
  const router = useRouter()
  const { onOpen } = useEventModal()

  const { isLoading, searchResults, setSearchResults, handleSearch } =
    useSearch()

  const { searchTerm, setSearchTerm } = useDebounceSearch({
    initialValue: '',
    delay: 400,
    onSearch: handleSearch
  })

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setSearchTerm('')
      setSearchResults([])
    }, 600)
  }

  return (
    <Dialog
      id="search-dialog"
      as="div"
      open={isOpen}
      onClose={handleClose}
      role="dialog"
      unmount
      className="relative z-50 focus:outline-none"
    >
      <DialogBackdrop
        transition
        className="fixed z-40 inset-0 bg-background/80 backdrop-blur-sm transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
        <DialogPanel
          transition
          className="mx-auto max-w-xl overflow-hidden transform rounded-xl bg-white dark:bg-background ring-1 ring-black/5 transition-all data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <Combobox
            onChange={(item: SearchDialogResult) => {
              if (!item) return
              if (item.entity === 'event') {
                handleClose()
                onOpen(item.date, item.id)
              }
              if (item.url) {
                router.push(item.url)
                handleClose()
              }
              if (item.entity === 'module' && !item.url) {
                toast({
                  title: 'This module has no videos',
                  description: 'Please try again later'
                })
              }
            }}
          >
            <SearchInput isLoading={isLoading} setSearchTerm={setSearchTerm} />
            <SearchResults
              isLoading={isLoading}
              searchTerm={searchTerm}
              searchResults={searchResults}
            />
          </Combobox>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default SearchDialog
