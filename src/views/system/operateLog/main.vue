<script setup lang="ts">
import type { TableColumnData } from '@arco-design/web-vue'
import type { FormSchema } from '@/components/QueryForm'
import { useGotoView } from '@/components/ViewController'
import { CusTable } from '@/components/CustomArco'
import { DictTypeEnum } from '@/enums'
import { getDictLabel, getDictOptions } from '@/utils/dict'
import { formatDate } from '@/utils/formatter'
import { downloadByBlob } from '@/utils/download'
import { useMessage } from '@/hooks'
import * as operateLogApi from '@/api/system/operateLog'

defineOptions({ name: 'OperateLogMain' })

const { t } = useI18n()
const message = useMessage()
const gotoView = useGotoView()

const formData = reactive({
  module: '',
  type: '',
  userNickname: '',
})
const formSchema: FormSchema[] = [
  {
    label: t('operateLog.module'),
    field: 'module',
    component: 'input',
  },
  {
    label: t('operateLog.type'),
    field: 'type',
    component: 'select',
    componentAttrs: { options: getDictOptions(DictTypeEnum.OPERATE_TYPE) },
  },
  {
    label: t('operateLog.user'),
    field: 'userNickname',
    component: 'input',
  },
]

const tbLoading = ref(false)
const tbCols: TableColumnData[] = [
  {
    title: t('operateLog.module'),
    dataIndex: 'module',
  },
  {
    title: t('operateLog.name'),
    dataIndex: 'name',
  },
  {
    title: t('operateLog.type'),
    dataIndex: 'type',
    render: ({ record }) => getDictLabel(DictTypeEnum.OPERATE_TYPE, record.type),
  },
  {
    title: t('operateLog.user'),
    dataIndex: 'userNickname',
  },
  {
    title: t('operateLog.resultCode'),
    dataIndex: 'resultCode',
  },
  {
    title: t('operateLog.time'),
    dataIndex: 'startTime',
    render: ({ record }) => formatDate(record.startTime),
  },
  {
    title: t('operateLog.duration'),
    dataIndex: 'duration',
    render: ({ record }) => `${record.duration}ms`,
  },
  {
    title: t('common.operate'),
    align: 'center',
    width: 100,
    slotName: 'operate',
  },
]
const tbData = ref([])
const tbPage = reactive({ pageNo: 1, pageSize: 20 })
const tbTotal = ref(0)

watch(tbPage, () => {
  query()
}, { immediate: true })

function query() {
  tbLoading.value = true
  operateLogApi.getOperateLogList({ ...tbPage, ...formData }).then((res) => {
    const { data } = res
    tbData.value = data.list
    tbTotal.value = data.total
  }).finally(() => {
    tbLoading.value = false
  })
}

function reset() {
  query()
}

function gotoDetail(data: any) {
  gotoView('detail', { props: { data } })
}

function handleExport() {
  message.confirm(t('operateLog.exportTip'), {
    onOk() {
      operateLogApi.exportOperateLog().then((res) => {
        downloadByBlob(res, t('operateLog.exportXlsx'))
      })
    },
  })
}
</script>

<template>
  <div class="grid grid-rows-[auto_minmax(0,_1fr)] h-full gap-10px">
    <div class="card">
      <QueryForm :model="formData" :schema="formSchema" @query="query" @reset="reset" />
    </div>
    <div class="card grid grid-rows-[auto_minmax(0,_1fr)] gap-10px">
      <ASpace>
        <AButton type="outline" @click="handleExport">
          {{ t('action.export') }}
        </AButton>
      </ASpace>
      <CusTable
        v-model:page="tbPage"
        :loading="tbLoading"
        :columns="tbCols"
        :data="tbData"
        :total="tbTotal"
        row-key="id"
      >
        <template #operate="{ record }">
          <AButton type="text" @click="gotoDetail(record)">
            {{ t('action.detail') }}
          </AButton>
        </template>
      </CusTable>
    </div>
  </div>
</template>

<style scoped lang="less">

</style>
