<script setup lang="ts">
import InfoModal from './InfoModal.vue'
import UpdatePwdModal from './UpdatePwdModal.vue'
import { PasswordStateEnum } from '@/enums'
import { useMessage } from '@/hooks'
import { useAppStore, useUserStore } from '@/store'

const { t } = useI18n()
const message = useMessage()
const appStore = useAppStore()
const userStore = useUserStore()

const headerHeight = computed(() => `${appStore.header.height}px`)

const infoModalRef = ref<InstanceType<typeof InfoModal>>()

async function handleSelect(value: any) {
  switch (value) {
    case 'userInfo':
      toValue(infoModalRef)?.open()
      break
    case 'logout':
      message.confirm(t('app.logoutTip'), {
        onOk() {
          userStore.logout()
        },
      })
      break
  }
}
</script>

<template>
  <ADropdown class="h-full" trigger="click" @select="handleSelect">
    <div class="icon-btn flex items-center gap-6px p-x-5px">
      <img :src="userStore.userInfo?.avatar" alt="头像" class="user-photo">
      <span>{{ userStore.userInfo?.nickname }}</span>
    </div>
    <template #content>
      <ADoption value="userInfo">
        {{ t('userInfo.personal') }}
      </ADoption>
      <ADoption value="logout">
        {{ t('app.logout') }}
      </ADoption>
    </template>
  </ADropdown>

  <InfoModal ref="infoModalRef" />
  <UpdatePwdModal v-if="userStore.passwordState != PasswordStateEnum.NORMAL" />
</template>

<style scoped lang="less">
.user-photo {
  --size: calc(v-bind(headerHeight) / 2 * 0.8);
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
}
</style>
