<script setup lang="ts">
import type { TableColumnData } from '@arco-design/web-vue'
import type { FormSchema } from '@/components/QueryForm'
import { useGotoView } from '@/components/ViewController'
import { CusTable } from '@/components/CustomArco'
import { DictTypeEnum } from '@/enums'
import { getDictLabel } from '@/utils/dict'
import { formatDate } from '@/utils/formatter'
import { downloadByBlob } from '@/utils/download'
import { useMessage } from '@/hooks'
import * as loginLogApi from '@/api/system/loginLog'

defineOptions({ name: 'LoginLogMain' })

const { t } = useI18n()
const message = useMessage()
const gotoView = useGotoView()

const formData = reactive({
  username: '',
  userIp: '',
})
const formSchema: FormSchema[] = [
  {
    label: t('loginLog.username'),
    field: 'username',
    component: 'input',
  },
  {
    label: t('loginLog.ip'),
    field: 'userIp',
    component: 'input',
  },
]

const tbLoading = ref(false)
const tbCols: TableColumnData[] = [
  {
    title: t('loginLog.username'),
    dataIndex: 'username',
    width: 150,
  },
  {
    title: t('loginLog.type'),
    dataIndex: 'logType',
    width: 150,
    render: ({ record }) => getDictLabel(DictTypeEnum.LOGIN_TYPE, record.logType),
  },
  {
    title: t('loginLog.ip'),
    dataIndex: 'userIp',
    width: 150,
  },
  {
    title: t('loginLog.userAgent'),
    dataIndex: 'userAgent',
    ellipsis: true,
    tooltip: true,
  },
  {
    title: t('loginLog.result'),
    dataIndex: 'result',
    width: 200,
    render: ({ record }) => getDictLabel(DictTypeEnum.LOGIN_RESULT, record.result),
  },
  {
    title: t('loginLog.time'),
    dataIndex: 'createTime',
    width: 200,
    render: ({ record }) => formatDate(record.createTime),
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
  loginLogApi.getLoginLogList({ ...tbPage, ...formData }).then((res) => {
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
  message.confirm(t('loginLog.exportTip'), {
    onOk() {
      loginLogApi.exportLoginLog().then((res) => {
        downloadByBlob(res, t('loginLog.exportXlsx'))
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
