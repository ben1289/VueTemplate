<script setup lang="ts">
import type { FormInstance } from '@arco-design/web-vue'
import type { QueryFormProps } from './QueryForm'
import { useWindowSize } from '@vueuse/core'

defineOptions({ name: 'QueryForm' })

const props = defineProps<QueryFormProps>()

const emit = defineEmits<{
  (e: 'query'): void
  (e: 'reset'): void
}>()

const { t } = useI18n()
const { width: windowWidth } = useWindowSize()

const formRef = ref<FormInstance>()
const showMore = ref(false)
const schemas = computed(() => {
  const width = toValue(windowWidth)
  const breakpoints = [
    { min: 1536, cols: 5 },
    { min: 1024, cols: 4 },
    { min: 768, cols: 3 },
    { min: 0, cols: 2 },
  ]
  const cols = breakpoints.find(bp => width >= bp.min)!.cols
  // 不显示更多时，去除最后一列用于显示按钮
  const showCols = toValue(showMore) ? cols : cols - 1
  return [props.schema.slice(0, showCols), props.schema.slice(showCols)]
})

function reset() {
  toValue(formRef)?.resetFields()
  emit('reset')
}
</script>

<template>
  <AForm
    ref="formRef"
    class="grid-cols-1 gap-x-16px gap-y-8px !grid 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
    :model="model"
    layout="inline"
  >
    <template v-for="(_schema, i) in schemas">
      <template v-if="i !== 1 || showMore">
        <AFormItem v-for="item in _schema" :key="item.field" :label="item.label" :field="item.field" v-bind="item.formItemAttrs">
          <AInput v-if="item.component === 'input'" v-model="model[item.field]" allow-clear v-bind="item.componentAttrs" @press-enter="emit('query')" />
          <ASelect v-else-if="item.component === 'select'" v-model="model[item.field]" allow-clear v-bind="item.componentAttrs" />
          <ATimePicker v-else-if="item.component === 'time'" v-model="model[item.field]" allow-clear v-bind="item.componentAttrs" />
          <ATimePicker v-else-if="item.component === 'timeRange'" v-model="model[item.field]" type="time-range" allow-clear v-bind="item.componentAttrs" />
          <ADatePicker v-else-if="item.component === 'date'" v-model="model[item.field]" allow-clear v-bind="item.componentAttrs" />
          <ARangePicker v-else-if="item.component === 'dateRange'" v-model="model[item.field]" allow-clear v-bind="item.componentAttrs" />
          <ADatePicker v-else-if="item.component === 'dateTime'" v-model="model[item.field]" allow-clear show-time v-bind="item.componentAttrs" />
          <ARangePicker v-else-if="item.component === 'dateTimeRange'" v-model="model[item.field]" show-time allow-clear v-bind="item.componentAttrs" />
          <slot v-else :name="item.component" />
        </AFormItem>
      </template>
    </template>
    <ASpace class="justify-end -col-end-1">
      <ALink v-if="schemas[1]?.length || showMore" :hoverable="false" @click="showMore = !showMore">
        {{ t('common.more') }}
        <i class="i-mdi-chevron-down text-20px transition duration-300" :class="{ 'rotate-180': showMore }" />
      </ALink>
      <AButton type="primary" @click="emit('query')">
        {{ t('action.query') }}
      </AButton>
      <AButton @click="reset">
        {{ t('action.reset') }}
      </AButton>
    </ASpace>
  </AForm>
</template>

<style scoped lang="less">
.arco-form-item {
  margin: 0;
}

:deep(.arco-form-item-content) > * {
  flex: 1;
}
</style>
