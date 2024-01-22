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
      <RouterView />
    </ASpin>
  </AConfigProvider>

  <!-- 水印 -->
  <Teleport v-if="globalConfig.watermark" to="body">
    <AWatermark
      :content="[globalConfig.watermark, userStore.userInfo?.nickname ?? '']"
      :gap="[200, 200]"
      :z-index="999999"
    />
  </Teleport>
</template>

<style scoped>
.arco-watermark {
  position: static !important;
}
</style>
