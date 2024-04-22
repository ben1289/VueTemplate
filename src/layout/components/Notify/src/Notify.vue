<script setup lang="ts">
import { useEventSource } from '@vueuse/core'
import { formatDate } from '@/utils/formatter'
import { useGlobalConfig } from '@/hooks'
import { getNotifyList } from '@/api/system/notify'

const { t } = useI18n()
const { baseUrl } = useGlobalConfig()

const { data } = useEventSource(`${baseUrl}/notify-unread`)
const unreadTotal = computed(() => {
  const number = Number(data.value)
  if (data.value && number > 0) {
    return number
  }
  return 0
})

const loading = ref(false)
const notifyList = ref<Record<string, any>[]>([])
const total = ref(0)
const page = reactive({ pageNo: 1, pageSize: 5 })

watch(page, () => {
  query()
})

function query() {
  loading.value = true
  getNotifyList(page).then((res) => {
    const { data } = res
    notifyList.value = data.list
    total.value = data.total
  }).finally(() => {
    loading.value = false
  })
}
</script>

<template>
  <APopover trigger="click" position="bottom" content-class="p-0!" @popup-visible-change="(visible) => visible && query()">
    <ABadge :max-count="99" :count="unreadTotal">
      <span class="icon-btn">
        <i class="i-mdi-bell-outline text-20px" />
      </span>
    </ABadge>

    <template #content>
      <AList
        class="w-400px"
        :loading="loading"
        :data="notifyList"
        :pagination-props="{
          total,
          current: page.pageNo,
          pageSize: page.pageSize,
        }"
        :bordered="false"
        @page-change="(no: number) => page.pageNo = no"
      >
        <template #item="{ item }">
          <AListItem :class="{ 'is-read': !item.unread }">
            <AListItemMeta>
              <template #title>
                {{ item.title }}
              </template>
              <template #description>
                <div class="overflow-hidden text-ellipsis whitespace-nowrap" :title="item.content">
                  {{ item.content }}
                </div>
                <div class="text-12px">
                  {{ formatDate(item.time) }}
                </div>
              </template>
            </AListItemMeta>
          </AListItem>
        </template>
      </AList>

      <div class="flex p-10px">
        <AButton type="text" long>
          {{ t('notify.allRead') }}
        </AButton>
        <ADivider direction="vertical" />
        <AButton type="text" long>
          {{ t('notify.viewMore') }}
        </AButton>
      </div>
    </template>
  </APopover>
</template>

<style scoped lang="less">
:deep(.arco-list) {
  .arco-list-content {
    .arco-list-item-main,
    .arco-list-item-meta-content {
      overflow: hidden;
    }

    .arco-list-item.is-read {
      filter: opacity(0.6);
    }

    .arco-empty {
      flex-direction: column;
    }
  }
}

:deep(.arco-list-pagination) {
  margin-top: 0;
}
</style>
