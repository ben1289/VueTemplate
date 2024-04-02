<script setup lang="ts">
import type { FormInstance } from '@arco-design/web-vue'
import { useMessage } from '@/hooks'
import { updateUserPwdApi } from '@/api/userInfo'

const emit = defineEmits<{
  (e: 'done'): void
}>()

const { t } = useI18n()
const message = useMessage()

const pwdForm = ref<FormInstance>()
const pwdFormData = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})
const pwdFormRules = {
  oldPassword: [{ required: true, message: t('userInfo.oldPwdRequired') }],
  newPassword: [
    { required: true, message: t('userInfo.newPwdRequired') },
    { validator: checkNewPwd, trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: t('userInfo.confirmPwdRequired') },
    { validator: checkConfirmPwd },
  ],
}

/**
 * 校验密码复杂度
 * @param value
 * @param callback
 */
function checkNewPwd(value: any, callback: any) {
  if (value.length < 8) {
    callback(t('userInfo.pwdLength'))
  }
  if (!/[A-Z]/.test(value)) {
    callback(t('userInfo.pwdUpperCase'))
  }
  if (!/[a-z]/.test(value)) {
    callback(t('userInfo.pwdLowerCase'))
  }
  if (!/\d/.test(value)) {
    callback(t('userInfo.pwdNumber'))
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
    callback(t('userInfo.pwdSpecial'))
  }
  callback()
}

/**
 * 校验确认密码和新密码是否一致
 * @param value
 * @param callback
 */
function checkConfirmPwd(value: any, callback: any) {
  if (value !== toValue(pwdFormData)?.newPassword) {
    callback(t('userInfo.pwdDiff'))
  }
  callback()
}

/**
 * 修改密码
 */
function updatePwd() {
  toValue(pwdForm)?.validate((errors) => {
    if (!errors) {
      updateUserPwdApi(toValue(pwdFormData)).then(() => {
        message.success(t('userInfo.editPwdSuccess'))
        resetPwd()
        emit('done')
      })
    }
  })
}

/**
 * 重置密码
 */
function resetPwd() {
  toValue(pwdForm)?.resetFields()
}
</script>

<template>
  <AForm ref="pwdForm" :model="pwdFormData" :rules="pwdFormRules" auto-label-width>
    <AFormItem :label="t('userInfo.oldPwd')" field="oldPassword">
      <AInputPassword v-model="pwdFormData.oldPassword" />
    </AFormItem>
    <AFormItem :label="t('userInfo.newPwd')" field="newPassword">
      <AInputPassword v-model="pwdFormData.newPassword" />
    </AFormItem>
    <AFormItem :label="t('userInfo.confirmPwd')" field="confirmPassword">
      <AInputPassword v-model="pwdFormData.confirmPassword" />
    </AFormItem>
    <div class="flex items-center justify-center gap-x-20px">
      <AButton type="primary" @click="updatePwd">
        {{ t('action.save') }}
      </AButton>
      <AButton @click="resetPwd">
        {{ t('action.reset') }}
      </AButton>
    </div>
  </AForm>
</template>

<style scoped lang="less">

</style>
