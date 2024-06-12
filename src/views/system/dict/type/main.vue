<script setup lang="ts">
import type { TableColumnData } from '@arco-design/web-vue'
import type { FormSchema } from '@/components/QueryForm'
import AddEditModal from './addEditModal.vue'
import { useGotoView } from '@/components/ViewController'
import { CusTable } from '@/components/CustomArco'
import { CommonStateEnum } from '@/enums'
import { downloadByBlob } from '@/utils/download'
import { useMessage } from '@/hooks'
import * as dictApi from '@/api/system/dict'

defineOptions({ name: 'DictTypeMain' })

const { t } = useI18n()
const message = useMessage()
const gotoView = useGotoView()

const formData = reactive({
  dictName: '',
  dictType: '',
})
const formSchema: FormSchema[] = [
  {
    label: t('dict.dictName'),
    field: 'dictName',
    component: 'input',
  },
  {
    label: t('dict.dictType'),
    field: 'dictType',
    component: 'input',
  },
]

const tbLoading = ref(false)
const tbCols: TableColumnData[] = [
  {
    title: t('dict.dictName'),
    dataIndex: 'dictName',
  },
  {
    title: t('dict.dictType'),
    dataIndex: 'dictType',
    slotName: 'dictType',
  },
  {
    title: t('dict.remark'),
    dataIndex: 'remark',
  },
  {
    title: t('dict.state'),
    align: 'center',
    slotName: 'state',
  },
  {
    title: t('common.operate'),
    align: 'center',
    width: 160,
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
  dictApi.getDictTypeList({ ...tbPage, ...formData }).then((res) => {
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

const addEditModalRef = ref<InstanceType<typeof AddEditModal>>()

function openAddEdit(id?: number) {
  toValue(addEditModalRef)?.open(id)
}

function handleExport() {
  message.confirm(t('dict.exportDictTip'), {
    onOk() {
      dictApi.exportDictType().then((res) => {
        downloadByBlob(res, t('dict.exportDictXlsx'))
      })
    },
  })
}

function handleBeforeStateChange(state: any) {
  return new Promise<boolean>((resolve) => {
    message.confirm(t(state ? 'dict.enableDictTip' : 'dict.disableDictTip'), {
      onOk() {
        resolve(true)
      },
      onCancel() {
        resolve(false)
      },
    })
  })
}

function handleStateChange(id: number, state: boolean) {
  dictApi.updateDictTypeState({ id, state }).catch(() => {
    query()
  })
}

function gotoDictData(dictName: string, dictType: string) {
  gotoView('data/main', { props: { dictName, dictType }, events: { refresh: query } })
}

function handleDelete(id: number) {
  message.confirm(t('dict.deleteDictTip'), {
    onOk() {
      dictApi.deleteDictType(id).then(() => {
        message.success(t('tip.deleteSuccess'))
        query()
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
        <AButton type="outline" @click="openAddEdit()">
          {{ t('action.add') }}
        </AButton>
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
        <template #dictType="{ record }">
          <ALink @click="gotoDictData(record.dictName, record.dictType)">
            {{ record.dictType }}
          </ALink>
        </template>

        <template #state="{ record }">
          <ASwitch
            v-model="record.state"
            type="round"
            :checked-value="CommonStateEnum.ENABLE"
            :unchecked-value="CommonStateEnum.DISABLE"
            :before-change="handleBeforeStateChange"
            @change="handleStateChange(record.id, $event as boolean)"
          />
        </template>

        <template #operate="{ record }">
          <AButton type="text" @click="openAddEdit(record.id)">
            {{ t('action.edit') }}
          </AButton>
          <AButton type="text" status="danger" @click="handleDelete(record.id)">
            {{ t('action.delete') }}
          </AButton>
        </template>
      </CusTable>
    </div>

    <AddEditModal ref="addEditModalRef" @refresh="query" />
  </div>
</template>

<style scoped lang="less">

</style>
