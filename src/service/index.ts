import type { AxiosInstance } from 'axios'
import axios from 'axios'
import { createInterceptor } from './interceptor'
import { useGlobalConfig } from '@/hooks'

const { baseUrl, apiUrl } = useGlobalConfig()

const service: AxiosInstance = new (axios.create as any)({
  baseURL: baseUrl + apiUrl,
  timeout: 1000 * 30,
})

createInterceptor(service)

export default service
