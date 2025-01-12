import 'axios'
import type { CryptoEnum } from '@/enums'

declare module 'axios' {
  interface AxiosRequestConfig {
    noToken?: boolean
    dedupe?: boolean
    encrypt?: CryptoEnum
    decrypt?: CryptoEnum
  }
}
