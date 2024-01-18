import type { AxiosInstance } from 'axios'
import axios from 'axios'
import { createInterceptor } from './interceptor'

const service: AxiosInstance = new (axios.create as any)({
  baseURL: import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_URL,
  timeout: 1000 * 30,
})

createInterceptor(service)

export default service
