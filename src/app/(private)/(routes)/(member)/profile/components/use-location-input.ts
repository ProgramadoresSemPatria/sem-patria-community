import { useDebounceSearch } from '@/hooks/shared/use-debounce-search'
import { useQuery } from '@tanstack/react-query'
import { useMapsLibrary } from '@vis.gl/react-google-maps'

const useLocationInput = () => {
  const { searchTerm, setSearchTerm, debouncedSearchTerm } = useDebounceSearch({
    initialValue: '',
    onSearch: () => {}
  })
  const placesLib = useMapsLibrary('places')

  const { data, isLoading } = useQuery({
    queryKey: ['places', debouncedSearchTerm, placesLib],
    queryFn: async () => {
      if (!placesLib || !debouncedSearchTerm) return
      const autocompleteService = new placesLib.AutocompleteService()
      const { predictions } = await autocompleteService.getPlacePredictions(
        {
          input: debouncedSearchTerm,
          types: ['(cities)']
        },
        (predictions, status) => {
          if (status === 'OK') {
            return predictions
          }
        }
      )

      const mappedPredictions = predictions.map(prediction => {
        return {
          key: prediction.place_id,
          label: prediction.description,
          value: prediction.description
        }
      })

      return mappedPredictions
    },
    enabled: !!placesLib && debouncedSearchTerm !== ''
  })

  return {
    inputValue: searchTerm,
    setInputValue: setSearchTerm,
    predictions: data,
    loadingPredictions: isLoading
  }
}

export default useLocationInput
