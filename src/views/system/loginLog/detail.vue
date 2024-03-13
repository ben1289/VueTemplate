<script setup lang="ts">
import { useGotoView } from '@/components/ViewController'
import { DictTypeEnum } from '@/enums'
import { getDictLabel } from '@/utils/dict'
import { formatDate } from '@/utils/formatter'

defineProps<{
  data: Record<string, any>
}>()

const { t } = useI18n()
const gotoView = useGotoView()

function gotoMain() {
  gotoView('main')
}
</script>

<template>
  <APageHeader
    class="card grid grid-rows-[auto_1fr] h-full"
    :title="t('action.detail')"
    @back="gotoMain"
  >
    <template #extra>
      <ASpace>
        <AButton @click="gotoMain">
          {{ t('action.back') }}
        </AButton>
      </ASpace>
    </template>

    <ADescriptions :column="1" :label-style="{ verticalAlign: 'top' }">
      <ADescriptionsItem :label="t('loginLog.logId')">
        {{ data.id }}
      </ADescriptionsItem>
      <ADescriptionsItem :label="t('loginLog.username')">
        {{ data.username }}
      </ADescriptionsItem>
      <ADescriptionsItem :label="t('loginLog.type')">
        {{ getDictLabel(DictTypeEnum.LOGIN_TYPE, data.logType) }}
      </ADescriptionsItem>
      <ADescriptionsItem :label="t('loginLog.ip')">
        {{ data.userIp }}
      </ADescriptionsItem>
      <ADescriptionsItem :label="t('loginLog.userAgent')">
        {{ data.userAgent }}
      </ADescriptionsItem>
      <ADescriptionsItem :label="t('loginLog.result')">
        {{ getDictLabel(DictTypeEnum.LOGIN_RESULT, data.result) }}
      </ADescriptionsItem>
      <ADescriptionsItem :label="t('loginLog.time')">
        {{ formatDate(data.createTime) }}
      </ADescriptionsItem>
    </ADescriptions>
  </APageHeader>
</template>

<style scoped lang="less">
:deep(.arco-page-header-content) {
  overflow: auto;
}
</style>
