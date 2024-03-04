<script setup lang="ts">
import type { FormInstance, TableColumnData } from '@arco-design/web-vue'
import { CommonStateEnum } from '@/enums'
import { downloadByBlob } from '@/utils/download'
import { useMessage } from '@/hooks'
import { useGotoView } from '@/components/ViewController'
import { CusTable } from '@/components/CustomArco'
import * as roleApi from '@/api/system/role'

defineOptions({ name: 'RoleMain' })

const { t } = useI18n()
const message = useMessage()
const gotoView = useGotoView()

const formRef = ref<FormInstance>()
const formData = reactive({
  roleName: '',
  roleCode: '',
})

const tbLoading = ref(false)
const tbCols: TableColumnData[] = [
  {
    title: t('role.roleName'),
    dataIndex: 'roleName',
  },
  {
    title: t('role.roleCode'),
    dataIndex: 'roleCode',
  },
  {
    title: t('role.remark'),
    dataIndex: 'remark',
  },
  {
    title: t('role.state'),
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
  roleApi.getRoleList({ ...tbPage, ...formData }).then((res) => {
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

function gotoAddEdit(id?: number) {
  gotoView('addEdit', { props: { id }, events: { refresh: query } })
}

function handleExport() {
  message.confirm(t('role.exportTip'), {
    onOk() {
      roleApi.exportRole().then((res) => {
        downloadByBlob(res, t('role.exportXlsx'))
      })
    },
  })
}

function handleBeforeStateChange(state: any) {
  return new Promise<boolean>((resolve) => {
    message.confirm(t(state ? 'role.enableTip' : 'role.disableTip'), {
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
  roleApi.updateRoleState({ id, state }).catch(() => {
    query()
  })
}

function handleDelete(id: number) {
  message.confirm(t('role.deleteTip'), {
    onOk() {
      roleApi.deleteRole(id).then(() => {
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
        <AFormItem :label="t('role.roleName')" field="roleName">
          <AInput v-model="formData.roleName" />
        </AFormItem>
        <AFormItem :label="t('role.roleCode')" field="roleCode">
          <AInput v-model="formData.roleCode" />
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
          <AButton type="text" @click="gotoAddEdit(record.id)">
            {{ t('action.edit') }}
          </AButton>

          <AButton type="text" status="danger" @click="handleDelete(record.id)">
            {{ t('action.delete') }}
          </AButton>
        </template>
      </CusTable>
    </div>
  </div>
</template>

<style scoped lang="less">

</style>
