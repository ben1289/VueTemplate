<script setup lang="ts">
import type { FormInstance, TableColumnData } from '@arco-design/web-vue'
import { commonStateEnum } from '@/enums'
import { formatDate } from '@/utils/formatter'
import { downloadByBlob } from '@/utils/download'
import { useMessage } from '@/hooks'
import { useGotoView } from '@/components/ViewController'
import { CusTable } from '@/components/CustomArco'
import * as tenantApi from '@/api/system/tenant'

defineOptions({ name: 'TenantListMain' })

const { t } = useI18n()
const message = useMessage()

const formRef = ref<FormInstance>()
const formData = reactive({
  tenantName: '',
  contactName: '',
  domain: '',
})

const tbLoading = ref(false)
const tbCols: TableColumnData[] = [
  {
    title: t('tenant.tenantName'),
    dataIndex: 'tenantName',
  },
  {
    title: t('tenant.tenantPackage'),
    dataIndex: 'packageName',
  },
  {
    title: t('tenant.contactName'),
    dataIndex: 'contactName',
  },
  {
    title: t('tenant.contactMobile'),
    dataIndex: 'contactMobile',
  },
  {
    title: t('tenant.accountLimit'),
    dataIndex: 'accountLimit',
  },
  {
    title: t('tenant.expireTime'),
    dataIndex: 'expireTime',
    render: ({ record }) => formatDate(record.expireTime),
  },
  {
    title: t('tenant.domain'),
    dataIndex: 'domain',
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
  tenantApi.getTenantList({ ...tbPage, ...formData }).then((res) => {
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
  useGotoView('addEdit', { props: { id }, events: { refresh: query } })
}

function handleExport() {
  message.confirm(t('tenant.exportTip'), {
    onOk() {
      tenantApi.exportTenant().then((res) => {
        downloadByBlob(res, t('tenant.exportXlsx'))
      })
    },
  })
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
  tenantApi.updateTenantState({ id, state }).catch(() => {
    query()
  })
}

function handleDelete(id: number) {
  message.confirm(t('tenant.deleteTip'), {
    onOk() {
      tenantApi.deleteTenant(id).then(() => {
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
        <AFormItem :label="t('tenant.tenantName')" field="tenantName">
          <AInput v-model="formData.tenantName" />
        </AFormItem>
        <AFormItem :label="t('tenant.contactName')" field="contactName">
          <AInput v-model="formData.contactName" />
        </AFormItem>
        <AFormItem :label="t('tenant.domain')" field="domain">
          <AInput v-model="formData.domain" />
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
  </div>
</template>

<style scoped lang="less">

</style>
