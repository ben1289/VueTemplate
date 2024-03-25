<script setup lang="ts">
import type { FormInstance } from '@arco-design/web-vue'
import { useGotoView } from '@/components/ViewController'
import { getDictOptions } from '@/utils/dict'
import { arrayToTree } from '@/utils/dataHandler'
import { DictTypeEnum, UserSexEnum } from '@/enums'
import { useMessage } from '@/hooks'
import * as userApi from '@/api/system/user'
import { getRoleSimpleList } from '@/api/system/role'
import { getDeptSimpleList } from '@/api/system/dept'

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

const roleOptions = ref<any[]>([])
const deptTree = ref<any[]>([])

const formRef = ref<FormInstance>()
const formData = ref({
  username: '',
  password: '',
  nickname: '',
  sex: UserSexEnum.MALE,
  role: [],
  mobile: '',
  email: '',
  dept: '',
  remark: '',
})
const formRules = {
  username: [{ required: true, message: t('user.usernameRequired') }],
  password: [{ required: true, message: t('user.passwordRequired') }],
  nickname: [{ required: true, message: t('user.nicknameRequired') }],
  sex: [{ required: true, message: t('user.sexRequired') }],
  role: [{ required: true, message: t('user.roleRequired') }],
}

function init() {
  getRoleSimpleList().then((res) => {
    roleOptions.value = res.data
  })
  getDeptSimpleList().then((res) => {
    deptTree.value = arrayToTree(res.data)
  })
  if (props.id) {
    userApi.getUserDetail(props.id).then((res) => {
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
      userApi.saveUser(toValue(formData)).then(() => {
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
    :subtitle="isEdit ? formData.username : ''"
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
      <AFormItem v-if="!isEdit" :label="t('user.username')" field="username">
        <AInput v-model="formData.username" />
      </AFormItem>
      <AFormItem v-if="!isEdit" :label="t('user.password')" field="password">
        <AInputPassword v-model="formData.password" />
      </AFormItem>
      <AFormItem :label="t('user.nickname')" field="nickname">
        <AInput v-model="formData.nickname" />
      </AFormItem>
      <AFormItem :label="t('user.sex')" field="sex">
        <ARadioGroup v-model="formData.sex" :options="getDictOptions(DictTypeEnum.USER_SEX)" />
      </AFormItem>
      <AFormItem :label="t('user.role')" field="role">
        <ASelect v-model="formData.role" :options="roleOptions" :field-names="{ value: 'id', label: 'name' }" allow-clear multiple />
      </AFormItem>
      <AFormItem :label="t('user.mobile')" field="mobile">
        <AInput v-model="formData.mobile" />
      </AFormItem>
      <AFormItem :label="t('user.email')" field="email">
        <AInput v-model="formData.email" />
      </AFormItem>
      <AFormItem :label="t('user.dept')" field="dept">
        <ATreeSelect v-model="formData.dept" :data="deptTree" :field-names="{ key: 'id', title: 'name' }" allow-clear />
      </AFormItem>
      <AFormItem :label="t('user.remark')" field="remark">
        <ATextarea v-model="formData.remark" :max-length="200" :auto-size="{ minRows: 2 }" show-word-limit />
      </AFormItem>
    </AForm>
  </APageHeader>
</template>

<style scoped lang="less">
:deep(.arco-page-header-content) {
  overflow: auto;
}
</style>
