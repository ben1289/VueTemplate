<script setup lang="ts">
import type { FormInstance } from '@arco-design/web-vue'
import { useMessage } from '@/hooks'
import * as dictApi from '@/api/system/dict'

defineExpose({ open })

interface DictType {
  id?: number
  dictName: string
  dictType: string
  remark: string
}

const { t } = useI18n()
const message = useMessage()

const visible = ref(false)

const formRef = ref<FormInstance>()
const formData = ref<DictType>({
  dictName: '',
  dictType: '',
  remark: '',
})
const formRules = {
  dictName: [{ required: true, message: t('dict.dictNameRequired') }],
  dictType: [{ required: true, message: t('dict.dictTypeRequired') }],
}

function open(id?: number) {
  if (id) {
    dictApi.getDictType(id).then((res) => {
      formData.value = res.data
    })
  }
  visible.value = true
}

async function handleBeforeOk() {
  const errors = await toValue(formRef)?.validate()
  if (!errors) {
    await dictApi.saveDictType(toValue(formData))
    message.success(t('tip.saveSuccess'))
    return true
  }
  return false
}

function handleClose() {
  formData.value = {
    dictName: '',
    dictType: '',
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
      <AFormItem :label="t('dict.dictName')" field="dictName">
        <AInput v-model="formData.dictName" />
      </AFormItem>
      <AFormItem :label="t('dict.dictType')" field="dictType">
        <AInput v-model="formData.dictType" />
      </AFormItem>
      <AFormItem :label="t('dict.remark')" field="remark">
        <ATextarea v-model="formData.remark" :max-length="200" :auto-size="{ minRows: 2 }" show-word-limit />
      </AFormItem>
    </AForm>
  </AModal>
</template>

<style scoped lang="less">

</style>
