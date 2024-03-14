import type { FormSchema } from './types'

export interface QueryFormProps {
  model: Record<string, any>
  schema: FormSchema[]
}
