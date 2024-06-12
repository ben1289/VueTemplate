<script setup lang="ts">
import type { FormInstance } from '@arco-design/web-vue'
import { arrayToTree } from '@/utils/dataHandler'
import { useMessage } from '@/hooks'
import * as deptApi from '@/api/system/dept'

const emit = defineEmits<{
  (e: 'refresh'): void
}>()

defineExpose({ open })

interface DeptData {
  parentId: '' | number
  id?: number
  deptName: string
  sort?: number
}

const { t } = useI18n()
const message = useMessage()

const visible = ref(false)

const deptTree = ref<any[]>([])
const formRef = ref<FormInstance>()
const formData = ref<DeptData>({
  parentId: '',
  deptName: '',
  sort: undefined,
})
const formRules = {
  parentId: [{ required: true, message: t('dept.parentDeptRequired') }],
  deptName: [{ required: true, message: t('dept.deptNameRequired') }],
  sort: [{ required: true, message: t('dept.sortRequired') }],
}

function open(id?: number) {
  deptApi.getDeptSimpleList().then((res) => {
    deptTree.value = [{ id: 0, name: t('dept.topDept'), children: arrayToTree(res.data) }]
  })
  if (id) {
    deptApi.getDeptDetail(id).then((res) => {
      formData.value = res.data
    })
  }
  visible.value = true
}

async function handleBeforeOk() {
  const errors = await toValue(formRef)?.validate()
  if (!errors) {
    await deptApi.saveDept(toValue(formData))
    message.success(t('tip.saveSuccess'))
    emit('refresh')
    return true
  }
  return false
}

function handleClose() {
  formData.value = {
    parentId: '',
    deptName: '',
    sort: undefined,
  }
  toValue(formRef)?.resetFields()
}
</script>

<template>
  <AModal
    v-model:visible="visible"
    :title="formData.id ? t('action.edit') : t('action.add')"
    :mask-closable="false"
    draggable
    @before-ok="handleBeforeOk"
    @close="handleClose"
  >
    <AForm ref="formRef" :model="formData" :rules="formRules" auto-label-width>
      <AFormItem :label="t('dept.parentDept')" field="parentId">
        <ATreeSelect
          v-model="formData.parentId"
          :data="deptTree"
          :field-names="{ key: 'id', title: 'name', icon: '' }"
        />
      </AFormItem>
      <AFormItem :label="t('dept.deptName')" field="deptName">
        <AInput v-model="formData.deptName" />
      </AFormItem>
      <AFormItem :label="t('dept.sort')" field="sort">
        <AInputNumber v-model="formData.sort" />
      </AFormItem>
    </AForm>
  </AModal>
</template>

<style scoped lang="less">

</style>
