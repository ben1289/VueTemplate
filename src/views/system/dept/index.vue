<script setup lang="ts">
import type { FormInstance, TableColumnData } from '@arco-design/web-vue'
import type { CusTableInstance } from '@/components/CustomArco'
import AddEditModal from './addEditModal.vue'
import { commonStateEnum } from '@/enums'
import { arrayToTree } from '@/utils/dataHandler'
import { useMessage } from '@/hooks'
import { CusTable } from '@/components/CustomArco'
import * as deptApi from '@/api/system/dept'

defineOptions({ name: 'DeptPage' })

const { t } = useI18n()
const message = useMessage()

const formRef = ref<FormInstance>()
const formData = reactive({
  deptName: '',
})

const tableRef = ref<CusTableInstance>()
const tbLoading = ref(false)
const tbCols: TableColumnData[] = [
  {
    title: t('dept.deptName'),
    dataIndex: 'deptName',
  },
  {
    title: t('dept.sort'),
    dataIndex: 'sort',
  },
  {
    title: t('dept.state'),
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
const tbData = ref<any[]>([])
const tbExpandAll = ref(false)

function query() {
  tbLoading.value = true
  deptApi.getDeptList(formData).then((res) => {
    tbData.value = arrayToTree(res.data)
  }).finally(() => {
    tbLoading.value = false
  })
}
query()

function reset() {
  toValue(formRef)?.resetFields()
  query()
}

const addEditModalRef = ref<InstanceType<typeof AddEditModal>>()

function gotoAddEdit(id?: number) {
  toValue(addEditModalRef)?.open(id)
}

function toggleExpandAll() {
  toValue(tableRef)?.arcoTable?.expandAll(tbExpandAll.value = !toValue(tbExpandAll))
}

function handleBeforeStateChange(state: any) {
  return new Promise<boolean>((resolve) => {
    message.confirm(t(state ? 'dept.enableTip' : 'dept.disableTip'), {
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
  deptApi.updateDeptState({ id, state }).catch(() => {
    query()
  })
}

function handleDelete(id: number) {
  message.confirm(t('dept.deleteTip'), {
    onOk() {
      deptApi.deleteDept(id).then(() => {
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
        <AFormItem :label="t('dept.deptName')" field="deptName">
          <AInput v-model="formData.deptName" />
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
        <AButton type="outline" @click="gotoAddEdit()">
          {{ t('action.add') }}
        </AButton>
        <AButton type="outline" @click="toggleExpandAll()">
          {{ t('dept.expandCollapse') }}
        </AButton>
      </ASpace>
      <CusTable
        ref="tableRef"
        :loading="tbLoading"
        :columns="tbCols"
        :data="tbData"
        row-key="id"
        :pagination="false"
      >
        <template #state="{ record }">
          <ASwitch
            v-model="record.state"
            type="round"
            :checked-value="commonStateEnum.ENABLE"
            :unchecked-value="commonStateEnum.DISABLE"
            :before-change="handleBeforeStateChange"
            @change="handleStateChange(record.id, $event as boolean)"
          />
        </template>

        <template #operate="{ record }">
          <AButton type="text" @click="gotoAddEdit(record.id)">
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
