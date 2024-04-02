<script setup lang="ts">
import UpdatePwdForm from './UpdatePwdForm.vue'
import { PasswordStateEnum } from '@/enums'
import { useUserStore } from '@/store'

const { t } = useI18n()
const userStore = useUserStore()

const visible = ref(true)
const closable = computed(() => userStore.passwordState === PasswordStateEnum.LONG_TERM)
const alertTip = computed(() => {
  if (userStore.passwordState === PasswordStateEnum.INIT) {
    return t('userInfo.initPwdTip')
  } else if (userStore.passwordState === PasswordStateEnum.LONG_TERM) {
    return t('userInfo.longTermPwdTip', { days: userStore.passwordExpirationDays })
  } else {
    return null
  }
})
</script>

<template>
  <AModal
    v-model:visible="visible"
    :title="t('userInfo.editPwd')"
    :mask-closable="false"
    :footer="false"
    :closable="closable"
    :esc-to-close="closable"
    draggable
    unmount-on-close
    @close="userStore.passwordState = PasswordStateEnum.NORMAL"
  >
    <AAlert v-if="alertTip" class="m-b-24px" type="warning" banner center>
      {{ alertTip }}
    </AAlert>

    <UpdatePwdForm @done="visible = false" />
  </AModal>
</template>

<style scoped lang="less">

</style>
