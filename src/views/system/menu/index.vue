<script setup lang="ts">
import type { FormInstance, TableColumnData } from '@arco-design/web-vue'
import type { MenuData } from '@/types'
import type { CusTableInstance } from '@/components/CustomArco'
import AddEdit from './addEdit.vue'
import { CusTable } from '@/components/CustomArco'
import { arrayToTree } from '@/utils/dataHandler'
import { useMessage } from '@/hooks'
import * as menuApi from '@/api/system/menu'

defineOptions({ name: 'MenuPage' })

const { t } = useI18n()
const message = useMessage()

const formRef = ref<FormInstance>()
const formData = reactive({
  name: '',
})

const tableRef = ref<CusTableInstance>()
const tbLoading = ref(false)
const tbColumns: TableColumnData[] = [
  {
    title: t('menu.name'),
    dataIndex: 'name',
  },
  {
    title: t('menu.type'),
    dataIndex: 'type',
    render: ({ record }) => t(`menu.${record.type}`),
  },
  {
    title: t('menu.showType'),
    dataIndex: 'showType',
    render: ({ record }) => record.showType && t(`menu.${record.showType}`),
  },
  {
    title: t('menu.visible'),
    dataIndex: 'visible',
    slotName: 'visible',
  },
  {
    title: t('menu.state'),
    dataIndex: 'state',
    slotName: 'state',
  },
  {
    title: t('common.operate'),
    align: 'center',
    width: 230,
    slotName: 'operate',
  },
]
const tbData = ref<MenuData[]>([])
const tbExpandAll = ref(false)

function query() {
  tbLoading.value = true
  menuApi.getMenuList(formData).then((res) => {
    const { data } = res
    tbData.value = arrayToTree(data)
  }).finally(() => {
    tbLoading.value = false
  })
}
query()

function reset() {
  toValue(formRef)?.resetFields()
  query()
}

function toggleExpandAll() {
  toValue(tableRef)?.arcoTable?.expandAll(tbExpandAll.value = !toValue(tbExpandAll))
}

function handleDelete(id: number) {
  message.confirm(t('menu.deleteConfirm'), {
    onOk() {
      menuApi.deleteMenu(id).then(() => {
        message.success(t('tip.deleteSuccess'))
        query()
      })
    },
  })
}

const addEditRef = ref<InstanceType<typeof AddEdit>>()
</script>

<template>
  <ASplit class="card h-full" default-size="0.6" min="0.3" max="0.7">
    <template #first>
      <div class="grid grid-rows-[auto_auto_1fr] h-full gap-10px">
        <AForm ref="formRef" :model="formData" layout="inline">
          <AFormItem :label="t('menu.name')" field="name">
            <AInput v-model="formData.name" />
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
        <ASpace>
          <AButton type="outline" @click="addEditRef?.operateMenu()">
            {{ t('action.add') }}
          </AButton>
          <AButton type="outline" @click="toggleExpandAll()">
            {{ t('menu.expandCollapse') }}
          </AButton>
        </ASpace>
        <CusTable
          ref="tableRef"
          class="overflow-auto"
          :loading="tbLoading"
          :columns="tbColumns"
          :data="tbData"
          row-key="id"
          :pagination="false"
        >
          <template #visible="{ record }">
            <ATag v-if="record.visible" color="arcoblue">
              {{ t('common.yes') }}
            </ATag>
            <ATag v-else>
              {{ t('common.no') }}
            </ATag>
          </template>

          <template #state="{ record }">
            <ATag v-if="record.state" color="arcoblue">
              {{ t('menu.enable') }}
            </ATag>
            <ATag v-else>
              {{ t('common.disable') }}
            </ATag>
          </template>

          <template #operate="{ record }">
            <AButton type="text" @click="addEditRef?.operateMenu(undefined, record.id)">
              {{ t('action.add') }}
            </AButton>
            <AButton type="text" @click="addEditRef?.operateMenu(record.id)">
              {{ t('action.edit') }}
            </AButton>
            <AButton type="text" status="danger" @click="handleDelete(record.id)">
              {{ t('action.delete') }}
            </AButton>
          </template>
        </CusTable>
      </div>
    </template>
    <template #second>
      <AddEdit ref="addEditRef" :menu-data="tbData" @refresh="query" />
    </template>
  </ASplit>
</template>

<style scoped lang="less">

</style>
