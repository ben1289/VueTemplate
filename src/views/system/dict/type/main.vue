<script setup lang="ts">
import type { FormInstance, TableColumnData } from '@arco-design/web-vue'
import AddEditModal from './addEditModal.vue'
import { CommonStateEnum } from '@/enums'
import { downloadByBlob } from '@/utils/download'
import { useMessage } from '@/hooks'
import { useGotoView } from '@/components/ViewController'
import { CusTable } from '@/components/CustomArco'
import * as dictApi from '@/api/system/dict'

defineOptions({ name: 'DictTypeMain' })

const { t } = useI18n()
const message = useMessage()
const gotoView = useGotoView()

const formRef = ref<FormInstance>()
const formData = reactive({
  dictName: '',
  dictType: '',
})

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
  toValue(formRef)?.resetFields()
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
      })
    },
  })
}
</script>

<template>
  <div class="grid grid-rows-[auto_minmax(0,_1fr)] h-full gap-10px">
    <div class="card">
      <AForm ref="formRef" :model="formData" layout="inline">
        <AFormItem :label="t('dict.dictName')" field="dictName">
          <AInput v-model="formData.dictName" />
        </AFormItem>
        <AFormItem :label="t('dict.dictType')" field="dictType">
          <AInput v-model="formData.dictType" />
        </AFormItem>
        <AFormItem class="m-l-a !w-auto">
          <ASpace>
            <AButton type="primary" @click="query">
              {{ t('action.query') }}
            </AButton>
            <AButton @click="reset">
              {{ t('action.reset') }}
            </AButton>
          </ASpace>
        </AFormItem>
      </AForm>
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

    <AddEditModal ref="addEditModalRef" />
  </div>
</template>

<style scoped lang="less">

</style>
