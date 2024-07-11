<script setup lang="ts">
import type { SearchMultipleInputProps } from './SearchMultipleInput'
import type { GetFetchData } from './types'
import { useFormItem } from '@arco-design/web-vue'
import PopoverTable from './components/PopoverTable.vue'

defineOptions({ name: 'SearchMultipleInput' })

const props = defineProps<SearchMultipleInputProps>()

const emit = defineEmits<{
  (e: 'change', value: (string | number)[], rows: Row): void
}>()

type Row = GetFetchData<typeof props.fetchData>

const { eventHandlers } = useFormItem()

const value = defineModel<(string | number)[]>('value', { default: [] })
const label = defineModel<(string | number)[]>('label', { default: [] })
const string = ref('')

const _fieldNames = computed(() => ({ valueKey: 'value', labelKey: 'label', ...props.fieldNames }))

const selectedRows = ref<Record<string, any>>([])

watch([value, label], ([_value, _label]) => {
  if (_value.length === _label.length) {
    selectedRows.value = _value.map((v, i) => {
      const { valueKey, labelKey } = toValue(_fieldNames)
      return {
        [valueKey]: v,
        [labelKey]: _label[i],
      }
    })
  }
}, { immediate: true })

function handleTagClose(row: Row) {
  const { valueKey } = toValue(_fieldNames)
  const index = toValue(value).indexOf(row[valueKey] as never)
  value.value.splice(index, 1)
}

function change(rows: Row[]) {
  const { labelKey } = toValue(_fieldNames)
  label.value = rows.map(row => row[labelKey])
  emit('change', toValue(value), rows)
  toValue(eventHandlers)?.onChange?.()
}
</script>

<template>
  <AInput v-model="string" class="search-multiple-input" :disabled="disabled">
    <template #prefix>
      <ATag
        v-for="(row, i) of selectedRows.slice(0, maxTags)"
        :key="row[_fieldNames.valueKey] || i"
        :closable="!disabled"
        @close="handleTagClose(row)"
      >
        {{ row[_fieldNames.labelKey] }}
      </ATag>
      <APopover v-if="maxTags != null && maxTags >= 0 && value.length > maxTags" content-class="!p-6px">
        <ATag>+{{ value.length - maxTags }}</ATag>
        <template #content>
          <div class="grid grid-cols-[repeat(4,_auto)] -mt-4px">
            <ATag
              v-for="(row, i) of selectedRows.slice(maxTags)"
              :key="row[_fieldNames.valueKey] || i"
              class="m-2px"
              :closable="!disabled"
              @close="handleTagClose(row)"
            >
              {{ row[_fieldNames.labelKey] }}
            </ATag>
          </div>
        </template>
      </APopover>
    </template>

    <template #append>
      <PopoverTable
        v-model:selected-keys="value"
        :columns="columns"
        :fetch-data="fetchData"
        :row-key="_fieldNames.valueKey"
        :multiple="true"
        :disabled="disabled"
        @change="change"
      />
    </template>
  </AInput>
</template>

<style scoped lang="less">
.search-multiple-input :deep(.arco-input-wrapper) {
  flex-wrap: wrap;

  &:not(.arco-input-focus) .arco-tag-checked {
    background-color: var(--color-bg-2);
    border-color: var(--color-fill-3);
  }

  .arco-input-prefix {
    flex-wrap: wrap;
    gap: 2px;
    padding-top: 3px;
    padding-bottom: 3px;
    max-width: 100%;

    &:not(:has(.arco-tag)) {
      padding-right: 0;
    }
  }

  .arco-input {
    flex: 1;
    min-width: 30%;
  }
}

:deep(.arco-input-append) {
  padding: 0;
  border: none;
}
</style>
