import type { MenuData } from '@/types'
import type { PasswordStateEnum } from '@/enums'

export interface LoginRequest {
  username: string
  password: string
  captchaVerification?: string
}

export interface LoginResponse {
  userId: string
  accessToken: string
  refreshToken: string
  expiresTime: number
  passwordState: PasswordStateEnum
  passwordExpirationDays?: number
}

export interface InfoResponse {
  user: Record<string, any>
  roles: string[]
  menus: MenuData[]
  permissions: string[]
}
