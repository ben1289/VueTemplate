<script setup lang="ts">
import type { FormInstance } from '@arco-design/web-vue'
import { resetUserPwd } from '@/api/system/user'

defineExpose({ open })

const { t } = useI18n()

const visible = ref(false)

const formRef = ref<FormInstance>()
const formData = reactive({
  userId: 0,
  password: '',
})
const formRules = {
  password: [{ required: true, message: t('user.newPasswordRequired') }],
}

function open(id: number) {
  formData.userId = id
  visible.value = true
}

async function handleBeforeOk() {
  const errors = await toValue(formRef)?.validate()
  if (!errors) {
    await resetUserPwd(formData)
    return true
  }
  return false
}

function handleClose() {
  toValue(formRef)?.resetFields()
}
</script>

<template>
  <AModal
    v-model:visible="visible"
    :title="t('user.resetPwd')"
    :mask-closable="false"
    draggable
    simple
    @before-ok="handleBeforeOk"
    @close="handleClose"
  >
    <AForm ref="formRef" :model="formData" :rules="formRules">
      <AFormItem :label="t('user.newPassword')" field="password">
        <AInputPassword v-model="formData.password" />
      </AFormItem>
    </AForm>
  </AModal>
</template>

<style scoped lang="less">

</style>
