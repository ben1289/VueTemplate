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
      <ADescriptionsItem :label="t('operateLog.logId')">
        {{ data.id }}
      </ADescriptionsItem>
      <ADescriptionsItem :label="t('operateLog.module')">
        {{ data.module }}
      </ADescriptionsItem>
      <ADescriptionsItem :label="t('operateLog.name')">
        {{ data.name }}
      </ADescriptionsItem>
      <ADescriptionsItem :label="t('operateLog.type')">
        {{ getDictLabel(DictTypeEnum.OPERATE_TYPE, data.type) }}
      </ADescriptionsItem>
      <ADescriptionsItem :label="t('operateLog.userId')">
        {{ data.userId }}
      </ADescriptionsItem>
      <ADescriptionsItem :label="t('operateLog.user')">
        {{ data.userNickname }}
      </ADescriptionsItem>
      <ADescriptionsItem :label="t('operateLog.userIp')">
        {{ data.userIp }}
      </ADescriptionsItem>
      <ADescriptionsItem :label="t('operateLog.userAgent')">
        {{ data.userAgent }}
      </ADescriptionsItem>
      <ADescriptionsItem :label="t('operateLog.url')">
        {{ data.requestMethod }} {{ data.requestUrl }}
      </ADescriptionsItem>
      <ADescriptionsItem :label="t('operateLog.javaMethod')">
        {{ data.javaMethod }}
      </ADescriptionsItem>
      <ADescriptionsItem :label="t('operateLog.javaParams')">
        {{ data.javaMethodArgs }}
      </ADescriptionsItem>
      <ADescriptionsItem :label="t('operateLog.time')">
        {{ formatDate(data.startTime) }}
      </ADescriptionsItem>
      <ADescriptionsItem :label="t('operateLog.duration')">
        {{ data.duration }}ms
      </ADescriptionsItem>
      <ADescriptionsItem :label="t('operateLog.resultCode')">
        {{ data.resultCode }}
      </ADescriptionsItem>
      <ADescriptionsItem :label="t('operateLog.resultMsg')">
        {{ data.resultMsg }}
      </ADescriptionsItem>
      <ADescriptionsItem :label="t('operateLog.resultData')">
        <div class="max-h-200px overflow-auto">
          {{ data.resultData }}
        </div>
      </ADescriptionsItem>
    </ADescriptions>
  </APageHeader>
</template>

<style scoped lang="less">
:deep(.arco-page-header-content) {
  overflow: auto;
}
</style>
