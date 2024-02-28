<script setup lang="ts">
import type { FormInstance } from '@arco-design/web-vue'
import { useGotoView } from '@/components/ViewController'
import { useMessage } from '@/hooks'
import * as tenantApi from '@/api/system/tenant'

const props = defineProps<{
  id?: number
}>()

const emit = defineEmits<{
  (e: 'refresh'): void
}>()

const { t } = useI18n()
const message = useMessage()
const gotoView = useGotoView()

const isEdit = computed(() => !!props.id)

init()

const packageOptions = ref<any[]>([])

const formRef = ref<FormInstance>()
const formData = ref({
  tenantName: '',
  packageId: '',
  contactName: '',
  contactMobile: '',
  username: '',
  password: '',
  accountLimit: 0,
  expireTime: '',
  domain: '',
})
const formRules = {
  tenantName: [{ required: true, message: t('tenant.tenantNameRequired') }],
  packageId: [{ required: true, message: t('tenant.tenantPackageRequired') }],
  contactName: [{ required: true, message: t('tenant.contactNameRequired') }],
  username: [{ required: true, message: t('tenant.usernameRequired') }],
  password: [{ required: true, message: t('tenant.passwordRequired') }],
  accountLimit: [{ required: true, message: t('tenant.accountLimitRequired') }],
  expireTime: [{ required: true, message: t('tenant.expireTimeRequired') }],
  domain: [{ required: true, message: t('tenant.domainRequired') }],
}

function init() {
  tenantApi.getTenantPackageSimpleList().then((res) => {
    packageOptions.value = res.data
  })
  if (props.id) {
    tenantApi.getTenantDetail(props.id).then((res) => {
      formData.value = res.data
    })
  }
}

function gotoMain() {
  gotoView('main')
}

const saveLoading = ref(false)

function save() {
  toValue(formRef)?.validate((errors) => {
    if (!errors) {
      saveLoading.value = true
      tenantApi.saveTenant(toValue(formData)).then(() => {
        message.success(t('tip.saveSuccess'))
        emit('refresh')
        gotoMain()
      }).finally(() => {
        saveLoading.value = false
      })
    }
  })
}
</script>

<template>
  <APageHeader
    class="card grid grid-rows-[auto_1fr] h-full"
    :title="isEdit ? t('action.edit') : t('action.add')"
    @back="gotoMain"
  >
    <template #extra>
      <ASpace>
        <AButton @click="gotoMain">
          {{ t('action.cancel') }}
        </AButton>
        <AButton type="primary" :loading="saveLoading" @click="save">
          {{ t('action.save') }}
        </AButton>
      </ASpace>
    </template>

    <AForm ref="formRef" class="m-a !w-50%" :model="formData" :rules="formRules" auto-label-width>
      <AFormItem :label="t('tenant.tenantName')" field="tenantName">
        <AInput v-model="formData.tenantName" />
      </AFormItem>
      <AFormItem :label="t('tenant.tenantPackage')" field="packageId">
        <ASelect v-model="formData.packageId" :options="packageOptions" :field-names="{ value: 'id', label: 'name' }" />
      </AFormItem>
      <AFormItem :label="t('tenant.contactName')" field="contactName">
        <AInput v-model="formData.contactName" />
      </AFormItem>
      <AFormItem :label="t('tenant.contactMobile')" field="contactMobile">
        <AInput v-model="formData.contactMobile" />
      </AFormItem>
      <AFormItem v-if="!isEdit" :label="t('tenant.username')" field="username">
        <AInput v-model="formData.username" />
      </AFormItem>
      <AFormItem v-if="!isEdit" :label="t('tenant.password')" field="password">
        <AInputPassword v-model="formData.password" />
      </AFormItem>
      <AFormItem :label="t('tenant.accountLimit')" field="accountLimit">
        <AInputNumber v-model="formData.accountLimit" />
      </AFormItem>
      <AFormItem :label="t('tenant.expireTime')" field="expireTime">
        <ADatePicker v-model="formData.expireTime" class="w-full" />
      </AFormItem>
      <AFormItem :label="t('tenant.domain')" field="domain">
        <AInput v-model="formData.domain" />
      </AFormItem>
    </AForm>
  </APageHeader>
</template>

<style scoped lang="less">
:deep(.arco-page-header-content) {
  overflow: auto;
}
</style>
