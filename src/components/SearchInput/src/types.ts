interface FetchParams {
  queryStr: string
  pageNo: number
  pageSize: number
}

interface FetchResult<T> {
  data: T[]
  total: number
}

export type FetchData<T = Record<string, any>> = (params: FetchParams) => Promise<FetchResult<T>>

export type GetFetchData<T> = T extends FetchData<infer E> ? E : unknown
