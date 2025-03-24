'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useReducer, useEffect } from 'react'

export enum CourseFilterLevels {
  Beginner = 'beginner',
  Intermediate = 'intermediate',
  Advanced = 'advanced'
}

export enum CourseFilterAvailability {
  Free = 'free'
}

type FilterOptionsState = {
  levels: CourseFilterLevels[]
  availability: CourseFilterAvailability[]
  category: string
}

type Action =
  | { type: 'SET_FILTER_LEVEL'; payload: CourseFilterLevels }
  | { type: 'SET_FILTER_AVAILABILITY'; payload: CourseFilterAvailability }
  | { type: 'CLEAR_ALL_FILTERS' }

const initialState: FilterOptionsState = {
  levels: [],
  availability: [],
  category: 'all'
}

const filterOptionsReducer = (
  state: FilterOptionsState,
  action: Action
): FilterOptionsState => {
  switch (action.type) {
    case 'SET_FILTER_LEVEL':
      return {
        ...state,
        levels: state.levels.includes(action.payload)
          ? state.levels.filter(level => level !== action.payload)
          : [...state.levels, action.payload]
      }
    case 'SET_FILTER_AVAILABILITY':
      return {
        ...state,
        availability: state.availability.includes(action.payload)
          ? state.availability.filter(
              availability => availability !== action.payload
            )
          : [...state.availability, action.payload]
      }
    case 'CLEAR_ALL_FILTERS':
      return initialState
    default:
      return state
  }
}

export const useCourseFilterOptions = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const category = searchParams.get('category')

  const [filterOptions, dispatch] = useReducer(
    filterOptionsReducer,
    initialState
  )

  useEffect(() => {
    const levelParam = searchParams.get('level')
    const availabilityParam = searchParams.get('availability')

    dispatch({ type: 'CLEAR_ALL_FILTERS' })

    if (levelParam) {
      levelParam.split(',').forEach(level => {
        if (
          Object.values(CourseFilterLevels).includes(
            level as CourseFilterLevels
          )
        ) {
          dispatch({
            type: 'SET_FILTER_LEVEL',
            payload: level as CourseFilterLevels
          })
        }
      })
    }

    if (availabilityParam) {
      availabilityParam.split(',').forEach(availability => {
        if (
          Object.values(CourseFilterAvailability).includes(
            availability as CourseFilterAvailability
          )
        ) {
          dispatch({
            type: 'SET_FILTER_AVAILABILITY',
            payload: availability as CourseFilterAvailability
          })
        }
      })
    }
  }, [searchParams])

  const showClearButton =
    (searchParams.get('level') !== '' && searchParams.get('level')) ||
    (searchParams.get('availability') !== '' &&
      searchParams.get('availability')) ||
    (searchParams.get('category') !== 'all' && searchParams.get('category'))

  const clearAllFilters = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL_FILTERS' })
    router.push(`?category=all`)
  }, [router])

  const onSelectFilterLevel = useCallback(async (value: CourseFilterLevels) => {
    dispatch({ type: 'SET_FILTER_LEVEL', payload: value })
  }, [])

  const onSelectFilterAvailability = useCallback(
    async (value: CourseFilterAvailability) => {
      dispatch({ type: 'SET_FILTER_AVAILABILITY', payload: value })
    },
    []
  )

  const navigateToLevelFilter = useCallback(
    (param: CourseFilterLevels) => {
      if (filterOptions.levels.includes(param)) {
        return (
          filterOptions.levels.filter(level => level !== param).join(',') ??
          null
        )
      }

      return [...filterOptions.levels, param].join(',')
    },
    [filterOptions.levels]
  )

  const navigateToAvailabilityFilter = useCallback(
    (param: CourseFilterAvailability) => {
      if (filterOptions.availability.includes(param)) {
        return (
          filterOptions.availability
            .filter(availability => availability !== param)
            .join(',') ?? null
        )
      }

      return [...filterOptions.availability, param].join(',')
    },
    [filterOptions.availability]
  )

  return {
    clearAllFilters,
    showClearButton,
    filterOptions,
    onSelectFilterLevel,
    onSelectFilterAvailability,
    category,
    navigateToLevelFilter,
    navigateToAvailabilityFilter,
    searchParams
  }
}
