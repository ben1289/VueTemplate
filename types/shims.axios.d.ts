import 'axios'
import type { CryptoEnum } from '@/enums'

declare module 'axios' {
  interface AxiosRequestConfig {
    noToken?: boolean
    encrypt?: CryptoEnum
    decrypt?: CryptoEnum
  }
}
