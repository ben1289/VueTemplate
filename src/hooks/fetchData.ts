import type { ResponseContent } from '@/types'
import type { FetchData } from '@/components/SearchInput'

export default function useFetchData(
  apiFn: (params: Record<string, any>) => ResponseContent,
  queryStrKey = 'queryStr',
  extraParams: Record<string, any> = {},
): FetchData {
  return async (params) => {
    const { queryStr, ...other } = params
    const { data } = await apiFn({ [queryStrKey]: queryStr, ...other, ...extraParams })
    return { data: data?.list ?? [], total: data?.total ?? 0 }
  }
}
