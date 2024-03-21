interface GridData extends Record<string, any> {
  gridItemProps?: Record<string, any>
  cardProps?: Record<string, any>
}

export interface GridCardProps {
  loading?: boolean
  data?: GridData[]
  total?: number
  pagination?: boolean
  gridProps?: Record<string, any>
  cardProps?: Record<string, any>
}
