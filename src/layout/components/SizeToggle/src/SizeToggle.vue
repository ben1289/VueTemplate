<script setup lang="ts">
import { LayoutSizeEnum } from '@/enums'
import { useAppStore } from '@/store'

defineOptions({ name: 'SizeToggle' })

const { t } = useI18n()
const appStore = useAppStore()

function toggleSize(size: any) {
  appStore.layoutSize = size
}
</script>

<template>
  <ADropdown trigger="click" @select="toggleSize">
    <span class="tool-button">
      <i class="i-mdi-format-size text-20px" />
    </span>
    <template #content>
      <ADoption :value="LayoutSizeEnum.LARGE">
        {{ t('sizeToggle.large') }}
      </ADoption>
      <ADoption :value="LayoutSizeEnum.MEDIUM">
        {{ t('sizeToggle.default') }}
      </ADoption>
      <ADoption :value="LayoutSizeEnum.SMALL">
        {{ t('sizeToggle.small') }}
      </ADoption>
      <ADoption :value="LayoutSizeEnum.MINI">
        {{ t('sizeToggle.mini') }}
      </ADoption>
    </template>
  </ADropdown>
</template>

<style scoped lang="less">

</style>
