<script setup lang="ts">
import type { FormInstance } from '@arco-design/web-vue'
import { useGotoView } from '@/components/ViewController'
import { arrayToTree } from '@/utils/dataHandler'
import { useMessage } from '@/hooks'
import * as tenantApi from '@/api/system/tenant'
import { getMenuList } from '@/api/system/menu'

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

const menuTree = ref<any[]>([])

const formRef = ref<FormInstance>()
const formData = ref({
  packageName: '',
  menus: [],
  remark: '',
})
const formRules = {
  packageName: [{ required: true, message: t('tenant.packageNameRequired') }],
}

function init() {
  getMenuList({}).then((res) => {
    menuTree.value = arrayToTree(res.data)
  })
  if (props.id) {
    tenantApi.getTenantPackageDetail(props.id).then((res) => {
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
      tenantApi.saveTenantPackage(toValue(formData)).then(() => {
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
      <AFormItem :label="t('tenant.packageName')" field="packageName">
        <AInput v-model="formData.packageName" />
      </AFormItem>
      <AFormItem :label="t('tenant.menuPermission')" field="menus">
        <div class="tree-box">
          <ATree
            v-model:checked-keys="formData.menus"
            :data="menuTree"
            :field-names="{ key: 'id', title: 'name', icon: '' }"
            action-on-node-click="expand"
            checkable
            block-node
          />
        </div>
      </AFormItem>
      <AFormItem :label="t('tenant.remark')" field="remark">
        <ATextarea v-model="formData.remark" :max-length="200" :auto-size="{ minRows: 2 }" show-word-limit />
      </AFormItem>
    </AForm>
  </APageHeader>
</template>

<style scoped lang="less">
:deep(.arco-page-header-content) {
  overflow: auto;
}

.tree-box {
  width: 100%;
  height: 400px;
  padding: 0 10px;
  border: 1px solid var(--color-border-2);
  border-radius: var(--border-radius-small);
  overflow: auto;
}
</style>
