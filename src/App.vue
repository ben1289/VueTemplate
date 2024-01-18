<script setup lang="ts">
import { useGlobalConfig } from '@/hooks'
import { useAppStore, useUserStore } from '@/store'

const globalConfig = useGlobalConfig()
const appStore = useAppStore()
const userStore = useUserStore()
</script>

<template>
  <AConfigProvider :locale="appStore.arcoLocale" :size="appStore.layoutSize" global>
    <ASpin class="h-full w-full" :loading="globalConfig.loading.value" dot>
      <AWatermark
        v-if="globalConfig.watermark"
        :content="[globalConfig.watermark, userStore.userInfo?.nickname ?? '']"
        :gap="[200, 200]"
      >
        <RouterView />
      </AWatermark>
      <RouterView v-else />
    </ASpin>
  </AConfigProvider>
</template>

<style scoped>
.arco-watermark {
  width: 100%;
  height: 100%;
}
</style>
