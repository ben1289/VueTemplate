<script setup lang="ts">
import type { FileItem, FormInstance, RequestOption } from '@arco-design/web-vue'
import { useDebounceFn } from '@vueuse/core'
import UpdatePwdForm from './UpdatePwdForm.vue'
import { getDictOptions } from '@/utils/dict'
import { formatDate } from '@/utils/formatter'
import { DictTypeEnum } from '@/enums'
import { getUserInfoApi, updateUserInfoApi, uploadAvatarApi } from '@/api/userInfo'

defineExpose({ open })

const { t } = useI18n()

const visible = ref(false)

function open() {
  visible.value = true
  getUserInfo()
}

// 个人信息
const infoForm = ref<FormInstance>()
const infoFormData = ref({
  avatar: '',
  username: '',
  nickname: '',
  sex: '',
  mobile: '',
  email: '',
  dept: '',
  post: '',
  role: '',
  createTime: '',
})
const infoFormRules = {
  nickname: [{ required: true, message: t('userInfo.nicknameRequired') }],
  sex: [{ required: true, message: t('userInfo.sexRequired') }],
  mobile: [{ required: true, message: t('userInfo.mobileRequired') }],
  email: [{ required: true, message: t('userInfo.emailRequired') }],
}

/**
 * 获取用户信息
 */
function getUserInfo() {
  getUserInfoApi().then((res) => {
    const { data } = res
    const { avatar, username, nickname, sex, mobile, email, dept, posts, roles, createTime } = data
    infoFormData.value = {
      avatar,
      username,
      nickname,
      sex,
      mobile,
      email,
      dept: dept?.map((d: any) => d.name)?.join('、'),
      post: posts?.map((post: any) => post.name)?.join('、'),
      role: roles?.map((role: any) => role.name)?.join('、'),
      createTime,
    }
  })
}

/**
 * 头像上传
 * @param option
 */
function handleAvatarUpload(option: RequestOption) {
  const { fileItem, onSuccess, onError } = option
  const controller = new AbortController()
  if (fileItem.file) {
    const formData = new FormData()
    formData.append('avatarFile', fileItem.file)
    uploadAvatarApi(formData, controller.signal).then((res) => {
      onSuccess(res.data)
    }).catch(onError)
  }
  return {
    abort() {
      controller.abort()
    },
  }
}

/**
 * 头像上传成功
 * @param fileItem
 */
function handleAvatarSuccess(fileItem: FileItem) {
  infoFormData.value.avatar = fileItem.response
}

/**
 * 自动保存用户信息
 */
const autoSaveInfo = useDebounceFn(() => {
  toValue(infoForm)?.validate((errors) => {
    if (!errors) {
      const { nickname, sex, mobile, email } = infoFormData.value
      updateUserInfoApi({ nickname, sex, mobile, email })
    }
  })
}, 1000)
</script>

<template>
  <AModal
    v-model:visible="visible"
    :title="t('userInfo.personal')"
    width="50%"
    :mask-closable="false"
    draggable
    unmount-on-close
  >
    <ATabs animation>
      <ATabPane key="1" :title="t('userInfo.personalInfo')">
        <AUpload
          class="avatar-uploader"
          action=""
          accept="image/*"
          :show-file-list="false"
          :custom-request="handleAvatarUpload"
          @success="handleAvatarSuccess"
        >
          <template #upload-button>
            <img v-if="infoFormData.avatar" :src="infoFormData.avatar" alt="头像" width="80" height="80">
            <i v-else class="i-mdi-plus !text-28px" />
          </template>
        </AUpload>
        <AForm
          ref="infoForm"
          class="grid-cols-2 gap-x-20px !grid"
          :model="infoFormData"
          :rules="infoFormRules"
          auto-label-width
        >
          <AFormItem :label="t('userInfo.username')">
            {{ infoFormData.username }}
          </AFormItem>
          <AFormItem :label="t('userInfo.nickname')" field="nickname">
            <AInput v-model="infoFormData.nickname" @change="autoSaveInfo" />
          </AFormItem>
          <AFormItem :label="t('userInfo.sex')" field="sex">
            <ARadioGroup v-model="infoFormData.sex" :options="getDictOptions(DictTypeEnum.USER_SEX)" @change="autoSaveInfo" />
          </AFormItem>
          <AFormItem :label="t('userInfo.role')">
            {{ infoFormData.role }}
          </AFormItem>
          <AFormItem :label="t('userInfo.mobile')" field="mobile">
            <AInput v-model="infoFormData.mobile" @change="autoSaveInfo" />
          </AFormItem>
          <AFormItem :label="t('userInfo.email')" field="email">
            <AInput v-model="infoFormData.email" @change="autoSaveInfo" />
          </AFormItem>
          <AFormItem :label="t('userInfo.dept')">
            {{ infoFormData.dept }}
          </AFormItem>
          <AFormItem :label="t('userInfo.post')">
            {{ infoFormData.post }}
          </AFormItem>
          <AFormItem :label="t('userInfo.createTime')">
            {{ formatDate(infoFormData.createTime) }}
          </AFormItem>
        </AForm>
      </ATabPane>

      <ATabPane key="2" :title="t('userInfo.editPwd')">
        <UpdatePwdForm class="m-a !w-450px" />
      </ATabPane>
    </ATabs>

    <template #footer>
      <AButton @click="visible = false">
        {{ t('action.close') }}
      </AButton>
    </template>
  </AModal>
</template>

<style scoped lang="less">
.avatar-uploader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  margin: 0 auto 10px;
  border: 1px dashed var(--color-border-3);
  border-radius: 6px;
  box-sizing: content-box;
  transition: all 0.3s;

  &:hover {
    border-color: rgb(var(--primary-5));
  }
}
</style>
