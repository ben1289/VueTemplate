<script setup lang="ts">
import type { FormInstance } from '@arco-design/web-vue'
import { useMessage } from '@/hooks'
import * as dictApi from '@/api/system/dict'

defineExpose({ open })

interface DictData {
  id?: number
  label: string
  value: string
  sort?: number
  remark: string
}

const { t } = useI18n()
const message = useMessage()

const visible = ref(false)

const formRef = ref<FormInstance>()
const formData = ref<DictData>({
  label: '',
  value: '',
  sort: undefined,
  remark: '',
})
const formRules = {
  label: [{ required: true, message: t('dict.dictLabelRequired') }],
  value: [{ required: true, message: t('dict.dictValueRequired') }],
  sort: [{ required: true, message: t('dict.sortRequired') }],
}

function open(id?: number) {
  if (id) {
    dictApi.getDictData(id).then((res) => {
      formData.value = res.data
    })
  }
  visible.value = true
}

async function handleBeforeOk() {
  const errors = await toValue(formRef)?.validate()
  if (!errors) {
    await dictApi.saveDictData(toValue(formData))
    message.success(t('tip.saveSuccess'))
    return true
  }
  return false
}

function handleClose() {
  formData.value = {
    label: '',
    value: '',
    sort: undefined,
    remark: '',
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
      <AFormItem :label="t('dict.dictLabel')" field="label">
        <AInput v-model="formData.label" />
      </AFormItem>
      <AFormItem :label="t('dict.dictValue')" field="value">
        <AInput v-model="formData.value" />
      </AFormItem>
      <AFormItem :label="t('dict.sort')" field="sort">
        <AInputNumber v-model="formData.sort" />
      </AFormItem>
      <AFormItem :label="t('dict.remark')" field="remark">
        <ATextarea v-model="formData.remark" :max-length="200" :auto-size="{ minRows: 2 }" show-word-limit />
      </AFormItem>
    </AForm>
  </AModal>
</template>

<style scoped lang="less">

</style>
