<script setup lang="ts">
import UpdatePwdForm from './UpdatePwdForm.vue'
import { PasswordStateEnum } from '@/enums'
import { useUserStore } from '@/store'

defineProps<{
  state: PasswordStateEnum
}>()

const { t } = useI18n()
const userStore = useUserStore()

const visible = ref(true)
</script>

<template>
  <AModal
    v-model:visible="visible"
    :title="t('userInfo.editPwd')"
    :mask-closable="false"
    :footer="false"
    :closable="state === PasswordStateEnum.LONG_TERM"
    :esc-to-close="state === PasswordStateEnum.LONG_TERM"
    draggable
    unmount-on-close
    @close="userStore.passwordState = null"
  >
    <AAlert class="m-b-24px" type="warning" banner center>
      {{ state === PasswordStateEnum.INIT ? t('userInfo.initPwdTip') : t('userInfo.longTermPwdTip') }}
    </AAlert>

    <UpdatePwdForm @done="visible = false" />
  </AModal>
</template>

<style scoped lang="less">

</style>
