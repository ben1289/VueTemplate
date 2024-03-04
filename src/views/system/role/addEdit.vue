<script setup lang="ts">
import type { FormInstance } from '@arco-design/web-vue'
import { DataScopeEnum, DictTypeEnum } from '@/enums'
import { getIntDictOptions } from '@/utils/dict'
import { arrayToTree } from '@/utils/dataHandler'
import { useMessage } from '@/hooks'
import { useGotoView } from '@/components/ViewController'
import * as roleApi from '@/api/system/role'
import { getMenuList } from '@/api/system/menu'
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

const menuTree = ref<any[]>([])
const deptTree = ref<any[]>([])

const formRef = ref<FormInstance>()
const formData = ref({
  roleName: '',
  roleCode: '',
  remark: '',
  menus: [],
  dataScope: DataScopeEnum.SELF,
  dataScopeDeptIds: [],
})
const formRules = {
  roleName: [{ required: true, message: t('role.roleNameRequired') }],
  roleCode: [{ required: true, message: t('role.roleCodeRequired') }],
}

function init() {
  if (props.id) {
    roleApi.getRoleDetail(props.id).then((res) => {
      formData.value = res.data
    })
  }

  getMenuList({}).then((res) => {
    menuTree.value = arrayToTree(res.data)
  })

  getDeptSimpleList().then((res) => {
    deptTree.value = arrayToTree(res.data)
  })
}

function gotoMain() {
  gotoView('main')
}

const saveLoading = ref(false)

function save() {
  toValue(formRef)?.validate((errors) => {
    if (!errors) {
      saveLoading.value = true
      roleApi.saveRole(toValue(formData)).then(() => {
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
      <AFormItem :label="t('role.roleName')" field="roleName">
        <AInput v-model="formData.roleName" />
      </AFormItem>
      <AFormItem :label="t('role.roleCode')" field="roleCode">
        <AInput v-model="formData.roleCode" />
      </AFormItem>
      <AFormItem :label="t('role.remark')" field="remark">
        <ATextarea v-model="formData.remark" :max-length="200" :auto-size="{ minRows: 2 }" show-word-limit />
      </AFormItem>
      <AFormItem :label="t('role.menuPermission')" field="menus">
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
      <AFormItem :label="t('role.dataPermission')" field="dataScope">
        <ASelect v-model="formData.dataScope" :options="getIntDictOptions(DictTypeEnum.DATA_SCOPE)" />
      </AFormItem>
      <AFormItem v-if="formData.dataScope === DataScopeEnum.DEPT_CUSTOM">
        <div class="tree-box !h-200px">
          <ATree
            v-model:checked-keys="formData.dataScopeDeptIds"
            :data="deptTree"
            :field-names="{ key: 'id', title: 'name', icon: '' }"
            action-on-node-click="expand"
            block-node
            checkable
          />
        </div>
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
