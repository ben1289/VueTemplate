<script setup lang="ts">
import type { TableColumnData } from '@arco-design/web-vue'
import type { FormSchema } from '@/components/QueryForm'
import AddEditModal from './addEditModal.vue'
import { useGotoView } from '@/components/ViewController'
import { CusTable } from '@/components/CustomArco'
import { CommonStateEnum } from '@/enums'
import { useMessage } from '@/hooks'
import * as dictApi from '@/api/system/dict'

defineOptions({ name: 'DictDataMain' })

const props = defineProps<{
  dictName: string
  dictType: string
}>()

const { t } = useI18n()
const message = useMessage()
const gotoView = useGotoView()

const formData = reactive({
  label: '',
  value: '',
})
const formSchema: FormSchema[] = [
  {
    label: t('dict.dictLabel'),
    field: 'label',
    component: 'input',
  },
  {
    label: t('dict.dictValue'),
    field: 'value',
    component: 'input',
  },
]

const tbLoading = ref(false)
const tbCols: TableColumnData[] = [
  {
    title: t('dict.dictLabel'),
    dataIndex: 'label',
  },
  {
    title: t('dict.dictValue'),
    dataIndex: 'value',
  },
  {
    title: t('dict.sort'),
    dataIndex: 'sort',
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
  dictApi.getDictDataList({ ...tbPage, ...formData, dictType: props.dictType }).then((res) => {
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
  toValue(addEditModalRef)?.open(props.dictType, id)
}

function handleBeforeStateChange(state: any) {
  return new Promise<boolean>((resolve) => {
    message.confirm(t(state ? 'dict.enableDictDataTip' : 'dict.disableDictDataTip'), {
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
  dictApi.updateDictDataState({ id, state }).catch(() => {
    query()
  })
}

function gotoDictType() {
  gotoView('type/main')
}

function handleDelete(id: number) {
  message.confirm(t('dict.deleteDictDataTip'), {
    onOk() {
      dictApi.deleteDictData(id).then(() => {
        message.success(t('tip.deleteSuccess'))
      })
    },
  })
}
</script>

<template>
  <APageHeader
    class="grid grid-rows-[auto_1fr] h-full"
    :title="t('dict.dictData')"
    :subtitle="`${dictName} ${dictType}`"
    @back="gotoDictType"
  >
    <div class="grid grid-rows-[auto_minmax(0,_1fr)] h-full gap-10px">
      <div class="card">
        <QueryForm :model="formData" :schema="formSchema" @query="query" @reset="reset" />
      </div>
      <div class="card grid grid-rows-[auto_minmax(0,_1fr)] gap-10px">
        <ASpace>
          <AButton type="outline" @click="openAddEdit()">
            {{ t('action.add') }}
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
  </APageHeader>
</template>

<style scoped lang="less">
.arco-page-header {
  padding: 0;

  :deep(.arco-page-header-wrapper) {
    padding-left: 0;
  }

  :deep(.arco-page-header-content) {
    padding: 0;
    border: none;
  }
}
</style>
