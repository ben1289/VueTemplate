import type { MenuData } from '@/types'
import router from '@/router'
import { MenuShowTypeEnum, MenuTypeEnum } from '@/enums'

export default function useMenuClick(menu: MenuData) {
  if (menu.type === MenuTypeEnum.MENU) {
    if (menu.showType === MenuShowTypeEnum.LINK) {
      const urlRegex = /^(https?):\/\/[^\s/$.?#].\S*$/
      const url = urlRegex.test(menu.link) ? menu.link : (location.origin + menu.link)
      window.open(url)
    } else {
      router.push(menu.routePath)
    }
  }
}
