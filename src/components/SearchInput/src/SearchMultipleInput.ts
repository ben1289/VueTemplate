import type { PopoverTableProps } from './components/PopoverTable'

export interface SearchMultipleInputProps extends Pick<PopoverTableProps, 'columns' | 'fetchData'> {
  fieldNames?: {
    valueKey?: string
    labelKey?: string
  }
  maxTags?: number
}
