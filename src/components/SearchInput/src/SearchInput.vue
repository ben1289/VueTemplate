<script setup lang="ts">
import type { SearchInputProps } from './SearchInput'
import type { GetFetchData } from './types'
import { useFormItem } from '@arco-design/web-vue'
import PopoverTable from './components/PopoverTable.vue'

defineOptions({ name: 'SearchInput' })

const props = defineProps<SearchInputProps>()

const emit = defineEmits<{
  (e: 'change', value?: string | number, row?: Row): void
}>()

type Row = GetFetchData<typeof props.fetchData>

const { eventHandlers } = useFormItem()

const value = defineModel<string | number>('value', { default: '' })
const label = defineModel<string | number>('label', { default: '' })
const string = ref('')

watch(label, () => {
  string.value = toValue(label)?.toString()
}, { immediate: true })

const _fieldNames = computed(() => ({ valueKey: 'value', labelKey: 'label', rowKey: 'id', ...props.fieldNames }))

function handleStringChange(str: string) {
  if (!str) {
    change()
  } else if (str !== toValue(label)) {
    string.value = toValue(label)?.toString()
  }
}

function change(row?: Row) {
  const { valueKey, labelKey } = toValue(_fieldNames)
  value.value = row?.[valueKey]
  label.value = row?.[labelKey]

  nextTick(() => {
    emit('change', toValue(value), row)
    toValue(eventHandlers)?.onChange?.()
  })
}
</script>

<template>
  <AInput v-model="string" class="search-input" :disabled="disabled" @change="handleStringChange">
    <template #append>
      <PopoverTable
        :class="popoverClass"
        :columns="columns"
        :fetch-data="fetchData"
        :always-fetch="alwaysFetch"
        :row-key="_fieldNames.rowKey"
        :multiple="false"
        :disabled="disabled"
        :style="popoverStyle"
        @change="change"
      />
    </template>
  </AInput>
</template>

<style scoped lang="less">
:deep(.arco-input-append) {
  padding: 0;
  border: none;
}
</style>
