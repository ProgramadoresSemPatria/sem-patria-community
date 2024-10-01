import { cn } from '@/lib/utils'
import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  LegacyRef,
  MutableRefObject,
  ReactNode,
  RefCallback,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
  clearable?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, className, type, clearable = false, ...props }, ref) => {
    const [value, setValue] = useState(props.value || '')
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      setValue(props.value || '')
    }, [props.value])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
      props.onChange?.(e)
    }

    const handleClear = () => {
      setValue('')
      props.onChange?.({
        target: { value: '' }
      } as ChangeEvent<HTMLInputElement>)
      inputRef.current?.focus()
    }

    function useMergeRefs<T = any>(
      ...refs: Array<MutableRefObject<T> | LegacyRef<T> | null | undefined>
    ): RefCallback<T> {
      return useCallback(value => {
        refs.forEach(ref => {
          if (typeof ref === 'function') {
            ref(value)
          } else if (ref != null) {
            ;(ref as MutableRefObject<T | null>).current = value
          }
        })
      }, refs)
    }

    const mergedRef = useMergeRefs(inputRef, ref)

    return (
      <div
        className={cn(
          'flex justify-between items-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
      >
        <input
          type={type}
          className="outline-none w-full h-full bg-transparent placeholder-text-muted-foreground"
          ref={mergedRef}
          value={value}
          onChange={handleChange}
          {...props}
        />
        {clearable && value && (
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            ✕
          </button>
        )}
        {icon && icon}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
