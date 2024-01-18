import 'axios'

declare module 'axios' {
  interface AxiosRequestConfig {
    noToken?: boolean
  }
}
