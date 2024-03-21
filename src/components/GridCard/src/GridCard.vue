<script setup lang="ts">
import type { GridCardProps } from './GridCard'

defineOptions({ name: 'GridCard' })

withDefaults(defineProps<GridCardProps>(), {
  loading: false,
  data: () => [],
  total: 0,
  pagination: true,
})

interface Page {
  pageNo: number
  pageSize: number
}

const page = defineModel<Page>('page', {
  default: { pageNo: 1, pageSize: 20 },
})

const slotNames = Object.keys(useSlots()).filter(slotName => !['fixed'].includes(slotName))
</script>

<template>
  <div class="grid-card">
    <ASpin class="overflow-auto" :loading="loading">
      <AGrid :cols="{ xxl: 4, lg: 3, sm: 2, xs: 1 }" :col-gap="12" :row-gap="12" v-bind="gridProps">
        <AGridItem v-if="$slots.fixed">
          <slot name="fixed" />
        </AGridItem>

        <AGridItem v-for="item in data" :key="item.id" v-bind="item.gridItemProps">
          <ACard v-bind="{ ...cardProps, ...item.cardProps }">
            <template v-for="slot in slotNames" :key="slot" #[slot]>
              <slot :name="slot" v-bind="item" />
            </template>
          </ACard>
        </AGridItem>
      </AGrid>
    </ASpin>

    <APagination
      v-if="pagination"
      v-model:current="page.pageNo"
      v-model:page-size="page.pageSize"
      :total="total"
      show-total
      show-page-size
      show-jumper
    />
  </div>
</template>

<style scoped lang="less">
.grid-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
}

:deep(.arco-grid-item) > .arco-card {
  height: 100%;
  transition-property: all;

  &.arco-card-hoverable:hover {
    transform: translateY(-4px);
  }
}

.arco-pagination {
  justify-content: flex-end;
}
</style>
