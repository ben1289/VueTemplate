export interface FormSchema {
  label: string
  field: string
  formItemAttrs?: Record<string, any>
  component: 'input' | 'select' | 'time' | 'timeRange' | 'date' | 'dateRange' | 'dateTime' | 'dateTimeRange' | string
  componentAttrs?: Record<string, any>
}
