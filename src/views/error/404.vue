<script setup lang="ts">
import { useGlobalConfig } from '@/hooks'

defineOptions({ name: 'Error404' })

const { t } = useI18n()
const globalConfig = useGlobalConfig()
</script>

<template>
  <div class="flex flex-col items-center gap-20px p-t-3%">
    <div class="not-found" />
    <span class="text-[var(--color-text-2)]">{{ t('errorPage.notFound') }}</span>
    <AButton type="primary" @click="$router.replace(globalConfig.homePath)">
      {{ t('errorPage.backHome') }}
    </AButton>
  </div>
</template>

<style scoped lang="less">
.not-found {
  width: 500px;
  height: 300px;
  background: url('@/assets/images/404.svg') no-repeat top;
}
</style>
