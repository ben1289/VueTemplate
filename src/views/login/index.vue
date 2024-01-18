<script setup lang="ts">
import type { FormInstance } from '@arco-design/web-vue'
import { useGlobalConfig, useStorage } from '@/hooks'
import { useUserStore } from '@/store'

defineOptions({ name: 'Login' })

const { t } = useI18n()
const router = useRouter()
const globalConfig = useGlobalConfig()
const storage = useStorage()
const userStore = useUserStore()

const formRef = ref<FormInstance>()
const formData = reactive({
  username: '',
  password: '',
})
const formRules = {
  username: [{ required: true, message: t('login.usernameRequired') }],
  password: [{ required: true, message: t('login.passwordRequired') }],
}
const remember = ref(false)
const loginLoading = ref(false)

onMounted(async () => {
  const loginData: typeof formData | null = await storage.indexedDB.getItem('loginData')
  if (loginData) {
    formData.username = loginData.username
    formData.password = loginData.password
    remember.value = true
  }
})

function handleLogin() {
  toValue(formRef)?.validate(async (errors) => {
    if (!errors) {
      loginLoading.value = true
      try {
        await userStore.login('上海平台', formData)
        if (toValue(remember)) {
          await storage.indexedDB.setItem('loginData', toRaw(formData))
        } else {
          await storage.indexedDB.removeItem('loginData')
        }
        await router.push(globalConfig.homePath)
      } finally {
        loginLoading.value = false
      }
    }
  })
}
</script>

<template>
  <div class="login">
    <div class="login-bg">
      <span class="relative left-12 top-12 text-28px text-white font-bold">
        {{ globalConfig.appTitle }}
      </span>
    </div>
    <div class="login-form">
      <div class="w-50%">
        <span class="text-30px text-#29264d font-bold">{{ t('login.welcome', { appTitle: globalConfig.appTitle }) }}</span>
        <AForm
          ref="formRef"
          class="m-t-40px"
          :model="formData"
          :rules="formRules"
          layout="vertical"
          size="large"
          hide-required-asterisk
          @submit.prevent
        >
          <AFormItem :label="t('login.username')" field="username" hide-asterisk>
            <AInput v-model="formData.username" @press-enter="handleLogin">
              <template #prefix>
                <i class="i-mdi-account-outline" />
              </template>
            </AInput>
          </AFormItem>
          <AFormItem :label="t('login.password')" field="password" hide-asterisk>
            <AInputPassword v-model="formData.password" @press-enter="handleLogin">
              <template #prefix>
                <i class="i-mdi-lock-outline" />
              </template>
            </AInputPassword>
          </AFormItem>
          <AFormItem>
            <ACheckbox v-model="remember">
              {{ t('login.remember') }}
            </ACheckbox>
          </AFormItem>
          <AFormItem>
            <AButton class="w-55%" type="primary" :loading="loginLoading" @click="handleLogin">
              {{ t('login.login') }}
            </AButton>
          </AFormItem>
        </AForm>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.login {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;

  .login-bg {
    background-color: #5273de;
    background-image: url('@/assets/images/login-bg.png');
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: contain;
  }

  .login-form {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
