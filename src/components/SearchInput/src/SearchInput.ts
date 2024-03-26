import type { PopoverTableProps } from './components/PopoverTable'

export interface SearchInputProps extends Pick<PopoverTableProps, 'columns' | 'fetchData' | 'disabled'> {
  fieldNames?: {
    valueKey?: string
    labelKey?: string
    rowKey?: string
  }
}
