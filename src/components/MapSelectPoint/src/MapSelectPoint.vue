<script setup lang="ts">
import type { PointInfo } from './hooks/aMap'
import { useDebounceFn } from '@vueuse/core'
import useAMap from './hooks/aMap'

defineOptions({ name: 'MapSelectPoint' })

defineProps<{
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'change', pointInfo: PointInfo): void
}>()

const modelValue = defineModel<string>({ default: '' })

const { initMap, removeMarker, getLocation, getAutoComplete, pointInfo } = useAMap()

let mapInit = false
const mapContainer = ref<HTMLDivElement>()

watch(modelValue, (value) => {
  if (!value) {
    removeMarker()
  }
})

watch(pointInfo, (point) => {
  modelValue.value = point.address
  emit('change', point)
})

async function handleVisibleChange(visible: boolean) {
  if (!visible)
    return
  if (!mapInit && mapContainer.value) {
    await initMap(mapContainer.value)
    mapInit = true
  }
  if (modelValue.value) {
    getLocation(modelValue.value, false)
  }
}

const address = ref('')
const autoCompleteData = ref<string[]>([])

const handleSearch = useDebounceFn(async (value: string) => {
  autoCompleteData.value = await getAutoComplete(value)
}, 500)
</script>

<template>
  <AInput v-model="modelValue" :disabled="disabled">
    <template #append>
      <APopover
        class="w-500px"
        trigger="click"
        position="bottom"
        content-class="map-popover-content"
        :unmount-on-close="false"
        @popup-visible-change="handleVisibleChange"
      >
        <AButton type="primary" :disabled="disabled">
          <template #icon>
            <i class="i-mdi-map-marker text-18px" />
          </template>
        </AButton>

        <template #content>
          <AAutoComplete
            v-model="address"
            class="m-b-10px !w-80%"
            :data="autoCompleteData"
            allow-clear
            @search="handleSearch"
            @select="getLocation(address)"
            @press-enter="getLocation(address)"
          >
            <template #append>
              <AButton type="primary" @click="getLocation(address)">
                <template #icon>
                  <i class="i-mdi-magnify text-18px" />
                </template>
              </AButton>
            </template>
          </AAutoComplete>
          <div ref="mapContainer" class="h-400px w-full" />
        </template>
      </APopover>
    </template>
  </AInput>
</template>

<style scoped lang="less">
:deep(.arco-input-append) {
  padding: 0;
  border: none;
}
</style>

<style lang="less">
.map-popover-content .arco-input-append {
  padding: 0;
  border: none;
}
</style>
