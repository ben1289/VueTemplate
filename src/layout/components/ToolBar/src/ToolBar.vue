<script setup lang="ts">
import { Collapse } from '@/layout/components/Menu'
import Breadcrumb from '@/layout/components/Breadcrumb'
import FullScreen from '@/layout/components/FullScreen'
import SizeToggle from '@/layout/components/SizeToggle'
import Translate from '@/layout/components/Translate'
import UserInfo from '@/layout/components/UserInfo'
import { LayoutModeEnum } from '@/enums'
import { useAppStore } from '@/store'

defineOptions({ name: 'ToolBar' })

const appStore = useAppStore()
</script>

<template>
  <div class="flex justify-between">
    <div class="flex items-center gap-20px">
      <Collapse v-if="appStore.layoutMode === LayoutModeEnum.ASIDE_FULL" class="tool-button" />
      <Breadcrumb />
    </div>
    <div class="flex items-center gap-10px">
      <FullScreen />
      <SizeToggle />
      <Translate />
      <UserInfo />
    </div>
  </div>
</template>

<style scoped lang="less">

</style>
