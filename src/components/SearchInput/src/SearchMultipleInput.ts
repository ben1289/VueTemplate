import type { PopoverTableProps } from './components/PopoverTable'

export interface SearchMultipleInputProps extends Pick<PopoverTableProps, 'columns' | 'fetchData' | 'alwaysFetch' | 'disabled'> {
  fieldNames?: {
    valueKey?: string
    labelKey?: string
  }
  maxTags?: number
  popoverClass?: string
  popoverStyle?: Record<string, any>
}
