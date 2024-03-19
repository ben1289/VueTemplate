interface Option {
  label: string
  click: Function
  disabled?: boolean
  [key: string]: any
}

export interface DropdownProps {
  options?: Option[]
  group?: { title: string, options: Option[] }[]
  disabled?: boolean
}
