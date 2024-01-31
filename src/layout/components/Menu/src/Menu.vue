<script setup lang="ts">
import SubMenu from './SubMenu.vue'
import { useUserStore } from '@/store'

defineOptions({ name: 'MainMenu' })

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

function handleMenuClick(key: string) {
  if (key === route.path)
    return
  const urlRegex = /^(https?):\/\/[^\s/$.?#].\S*$/
  if (urlRegex.test(key)) {
    window.open(key)
  } else {
    router.push(key)
  }
}
</script>

<template>
  <AMenu
    :selected-keys="[route.path]"
    accordion
    auto-open-selected
    auto-scroll-into-view
    @menu-item-click="handleMenuClick"
  >
    <template v-for="menu in userStore.menus" :key="menu.id">
      <SubMenu v-if="menu.visible" :menu-data="menu" />
    </template>
  </AMenu>
</template>

<style scoped lang="less">

</style>
