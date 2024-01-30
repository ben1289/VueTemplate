<script setup lang="ts">
import { LocaleEnum } from '@/enums'
import { useAppStore } from '@/store'

defineOptions({ name: 'Translate' })

const appStore = useAppStore()
</script>

<template>
  <ADropdown trigger="click" @select="appStore.toggleLocale">
    <span class="icon-btn">
      <i class="i-mdi-translate text-20px" />
    </span>
    <template #content>
      <ADoption :value="LocaleEnum.ZH_CN">
        简体中文
      </ADoption>
      <ADoption :value="LocaleEnum.EN_US">
        English
      </ADoption>
    </template>
  </ADropdown>
</template>

<style scoped lang="less">

</style>
