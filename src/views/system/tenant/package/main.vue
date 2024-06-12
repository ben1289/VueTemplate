<script setup lang="ts">
import type { TableColumnData } from '@arco-design/web-vue'
import type { FormSchema } from '@/components/QueryForm'
import { useGotoView } from '@/components/ViewController'
import { CusTable } from '@/components/CustomArco'
import { CommonStateEnum } from '@/enums'
import { useMessage } from '@/hooks'
import * as tenantApi from '@/api/system/tenant'

defineOptions({ name: 'TenantPackageMain' })

const { t } = useI18n()
const message = useMessage()
const gotoView = useGotoView()

const formData = reactive({
  packageName: '',
})
const formSchema: FormSchema[] = [
  {
    label: t('tenant.packageName'),
    field: 'packageName',
    component: 'input',
  },
]

const tbLoading = ref(false)
const tbCols: TableColumnData[] = [
  {
    title: t('tenant.packageName'),
    dataIndex: 'packageName',
  },
  {
    title: t('tenant.remark'),
    dataIndex: 'remark',
  },
  {
    title: t('tenant.state'),
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
  tenantApi.getTenantPackageList({ ...tbPage, ...formData }).then((res) => {
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

function gotoAddEdit(id?: number) {
  gotoView('addEdit', { props: { id }, events: { refresh: query } })
}

function handleBeforeStateChange(state: any) {
  return new Promise<boolean>((resolve) => {
    message.confirm(t(state ? 'tenant.enableTip' : 'tenant.disableTip'), {
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
  tenantApi.updateTenantPackageState({ id, state }).catch(() => {
    query()
  })
}

function handleDelete(id: number) {
  message.confirm(t('tenant.deleteTip'), {
    onOk() {
      tenantApi.deleteTenantPackage(id).then(() => {
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
        <AButton type="outline" @click="gotoAddEdit()">
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
