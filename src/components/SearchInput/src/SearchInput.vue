<script setup lang="ts">
import type { ModelValue, SearchInputProps } from './SearchInput'
import type { GetFetchData } from './types'
import PopoverTable from './components/PopoverTable.vue'

defineOptions({ name: 'SearchInput' })

const props = withDefaults(defineProps<SearchInputProps>(), {
  multiple: false,
})

type Row = GetFetchData<typeof props.fetchData>

const value = defineModel<ModelValue>('value', { default: '' })
const label = defineModel<ModelValue>('label', { default: '' })

watch(label, () => {
  string.value = toValue(label).toString()
}, { immediate: true })

const _fieldNames = computed(() => ({ valueKey: 'value', labelKey: 'label', rowKey: 'id', ...props.fieldNames }))

const string = ref('')

function handleStringChange(str: string) {
  if (!str) {
    change({})
  } else if (str !== toValue(label)) {
    string.value = toValue(label).toString()
  }
}

function change(row: Row) {
  const { valueKey, labelKey } = toValue(_fieldNames)
  value.value = row[valueKey]
  label.value = row[labelKey]
}
</script>

<template>
  <AInput v-model="string" @change="handleStringChange">
    <template #append>
      <PopoverTable :columns="columns" :fetch-data="fetchData" :row-key="_fieldNames.rowKey" @change="change" />
    </template>
  </AInput>
</template>

<style scoped lang="less">
:deep(.arco-input-append) {
  padding: 0;
  border: none;
}
</style>
