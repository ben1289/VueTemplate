<script setup lang="ts">
import InfoDialog from './InfoDialog.vue'
import { useUserStore } from '@/store'
import { useMessage } from '@/hooks'

const { t } = useI18n()
const userStore = useUserStore()
const message = useMessage()

const infoDialogRef = ref<InstanceType<typeof InfoDialog>>()

async function handleSelect(value: any) {
  switch (value) {
    case 'userInfo':
      toValue(infoDialogRef)?.open()
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
    <div class="tool-button flex items-center gap-6px p-x-5px !h-a !w-a">
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

  <InfoDialog ref="infoDialogRef" />
</template>

<style scoped lang="less">
.user-photo {
  --size: calc(var(--layout-header-height) / 2 * 0.8);
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
}
</style>
