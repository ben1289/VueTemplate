import { useUserStore } from '@/store'

const ALL_PERMISSION = '*:*:*'

export function checkPermission(permissions: string[]) {
  const userStore = useUserStore()
  return userStore.permissions.some(
    permission => permission === ALL_PERMISSION || permissions.includes(permission),
  )
}
