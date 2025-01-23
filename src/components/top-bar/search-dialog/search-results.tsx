import { type SearchDialogResult } from '@/hooks/search/types'
import { LoadingResults } from './loading-results'
import { EmptyState } from './empty-state'
import { ResultsList } from './results-list'

interface SearchResultsProps {
  isLoading: boolean
  searchTerm: string
  searchResults: SearchDialogResult[]
}

export const SearchResults = ({
  isLoading,
  searchTerm,
  searchResults
}: SearchResultsProps) => (
  <>
    {isLoading ? (
      <LoadingResults />
    ) : (
      <>
        {searchTerm === '' && searchResults.length === 0 && <EmptyState />}

        {searchTerm !== '' && searchResults.length === 0 && (
          <h6 className="font-medium px-6 py-14 text-center text-sm sm:px-14">
            No results found.
          </h6>
        )}

        {searchResults.length > 0 && (
          <ResultsList searchResults={searchResults} />
        )}
      </>
    )}
  </>
)
