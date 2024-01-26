<script setup lang="ts">
import type { FormInstance } from '@arco-design/web-vue'
import type { WithPartial, MenuData as _MenuData } from '@/types'
import { MenuShowTypeEnum, MenuTypeEnum } from '@/enums'
import { useMessage } from '@/hooks'
import * as menuApi from '@/api/system/menu'

type MenuData = WithPartial<_MenuData, 'id'>

const emit = defineEmits<{
  (e: 'refresh'): void
}>()

defineExpose({ operateMenu })

const { t } = useI18n()
const message = useMessage()

/**
 * 生成初始表单数据
 */
function createInitFormData(): MenuData {
  return {
    parentId: 0,
    type: MenuTypeEnum.DIR,
    name: '',
    icon: '',
    showType: MenuShowTypeEnum.LAYOUT,
    routePath: '',
    routeName: '',
    componentPath: '',
    componentName: '',
    link: '',
    permission: '',
    sort: null,
    keepAlive: false,
    visible: true,
    state: true,
  }
}

const detailLoading = ref(false)
const menuTree = computed(() => [{ id: 0, name: t('menu.rootMenu'), children: toValue(inject('menuTree')) }])
const formRef = ref<FormInstance>()
const formData = ref<MenuData | null>(null)
const formRules = {
  parentId: [{ required: true, message: t('menu.parentMenuRequired') }],
  type: [{ required: true, message: t('menu.typeRequired') }],
  name: [{ required: true, message: t('menu.nameRequired') }],
  showType: [{ required: true, message: t('menu.showTypeRequired') }],
  routePath: [{ required: true, message: t('menu.routePathRequired') }],
  componentPath: [{ required: true, message: t('menu.componentPathRequired') }],
  link: [{ required: true, message: t('menu.linkAddrRequired') }],
  permission: [{ required: true, message: t('menu.permissionRequired') }],
  sort: [{ required: true, message: t('menu.sortRequired') }],
  keepAlive: [{ required: true, message: t('menu.keepAliveRequired') }],
  visible: [{ required: true, message: t('menu.visibleRequired') }],
  state: [{ required: true, message: t('menu.stateRequired') }],
}

/**
 * 新增或编辑初始操作
 * @param id
 * @param parentId
 */
function operateMenu(id?: number, parentId?: number) {
  const setDetail = () => {
    if (id) {
      // 编辑
      detailLoading.value = true
      menuApi.getMenuDetail(id).then((res) => {
        const { data } = res
        formData.value = data
      }).finally(() => {
        detailLoading.value = false
      })
    } else {
      // 新增
      formData.value = createInitFormData()
      if (parentId) {
        formData.value.parentId = parentId
      }
    }
  }

  if (toValue(formData)) {
    message.confirm(t('menu.notSaveConfirm'), {
      onOk() {
        setDetail()
      },
    })
  } else {
    setDetail()
  }
}

function visibleByType(type: MenuTypeEnum[]) {
  return formData.value && type.includes(formData.value.type)
}

function visibleByShowType(type: MenuShowTypeEnum[]) {
  return formData.value && type.includes(formData.value.showType)
}

const saveLoading = ref(false)

function handleCancel() {
  formData.value = null
}

function handleSave() {
  toValue(formRef)?.validate((errors) => {
    if (!errors) {
      saveLoading.value = true
      menuApi.saveMenu(toValue(formData)).then(() => {
        emit('refresh')
        message.success(t('menu.saveSuccess'))
        handleCancel()
      }).finally(() => {
        saveLoading.value = false
      })
    }
  })
}
</script>

<template>
  <ASpin class="h-full w-full" :loading="detailLoading">
    <APageHeader v-if="formData" :title="formData?.id ? t('common.edit') : t('common.add')" :show-back="false">
      <template #extra>
        <ASpace>
          <AButton @click="handleCancel">
            {{ t('common.cancel') }}
          </AButton>
          <AButton type="primary" :loading="saveLoading" @click="handleSave">
            {{ t('common.save') }}
          </AButton>
        </ASpace>
      </template>

      <AForm ref="formRef" :model="formData" :rules="formRules" auto-label-width>
        <AFormItem :label="t('menu.parentMenu')" field="parentId">
          <ATreeSelect v-model="formData.parentId" :data="menuTree" :field-names="{ key: 'id', title: 'name', icon: '' }" />
        </AFormItem>

        <AFormItem :label="t('menu.type')" field="type">
          <ARadioGroup v-model="formData.type" type="button">
            <ARadio :value="MenuTypeEnum.DIR">
              {{ t('menu.dir') }}
            </ARadio>
            <ARadio :value="MenuTypeEnum.MENU">
              {{ t('menu.menu') }}
            </ARadio>
            <ARadio :value="MenuTypeEnum.BUTTON">
              {{ t('menu.button') }}
            </ARadio>
          </ARadioGroup>
        </AFormItem>

        <AFormItem :label="t('menu.name')" field="name">
          <AInput v-model="formData.name" />
        </AFormItem>

        <AFormItem
          v-if="visibleByType([MenuTypeEnum.DIR, MenuTypeEnum.MENU])"
          :label="t('menu.icon')"
          field="icon"
        >
          <AInput v-model="formData.icon" />
        </AFormItem>

        <AFormItem
          v-if="visibleByType([MenuTypeEnum.MENU])"
          :label="t('menu.showType')"
          field="showType"
        >
          <ARadioGroup v-model="formData.showType" type="button">
            <ARadio :value="MenuShowTypeEnum.LAYOUT">
              {{ t('menu.layout') }}
            </ARadio>
            <ARadio :value="MenuShowTypeEnum.FULL_PAGE">
              {{ t('menu.fullPage') }}
            </ARadio>
            <ARadio :value="MenuShowTypeEnum.LINK">
              {{ t('menu.link') }}
            </ARadio>
          </ARadioGroup>
        </AFormItem>

        <AFormItem
          v-if="visibleByType([MenuTypeEnum.DIR, MenuTypeEnum.MENU])
            && visibleByShowType([MenuShowTypeEnum.LAYOUT, MenuShowTypeEnum.FULL_PAGE])"
          :label="t('menu.routePath')"
          field="routePath"
        >
          <AInput v-model="formData.routePath" />
        </AFormItem>

        <AFormItem
          v-if="visibleByType([MenuTypeEnum.DIR, MenuTypeEnum.MENU])
            && visibleByShowType([MenuShowTypeEnum.LAYOUT, MenuShowTypeEnum.FULL_PAGE])"
          :label="t('menu.routeName')"
          field="routeName"
        >
          <AInput v-model="formData.routeName" />
        </AFormItem>

        <AFormItem
          v-if="visibleByType([MenuTypeEnum.MENU])
            && visibleByShowType([MenuShowTypeEnum.LAYOUT, MenuShowTypeEnum.FULL_PAGE])"
          :label="t('menu.componentPath')"
          field="componentPath"
        >
          <AInput v-model="formData.componentPath" />
        </AFormItem>

        <AFormItem
          v-if="visibleByType([MenuTypeEnum.MENU])
            && visibleByShowType([MenuShowTypeEnum.LAYOUT, MenuShowTypeEnum.FULL_PAGE])"
          :label="t('menu.componentName')"
          field="componentName"
        >
          <AInput v-model="formData.componentName" />
        </AFormItem>

        <AFormItem
          v-if="visibleByType([MenuTypeEnum.MENU])
            && visibleByShowType([MenuShowTypeEnum.LINK])"
          :label="t('menu.linkAddr')"
          field="link"
        >
          <AInput v-model="formData.link" />
        </AFormItem>

        <AFormItem
          v-if="visibleByType([MenuTypeEnum.BUTTON])"
          :label="t('menu.permission')"
          field="permission"
        >
          <AInput v-model="formData.permission" />
        </AFormItem>

        <AFormItem :label="t('menu.sort')" field="sort">
          <AInputNumber v-model="formData.sort" />
        </AFormItem>

        <AFormItem
          v-if="visibleByType([MenuTypeEnum.MENU])
            && visibleByShowType([MenuShowTypeEnum.LAYOUT, MenuShowTypeEnum.FULL_PAGE])
            && formData?.componentName"
          :label="t('menu.keepAlive')"
          field="keepAlive"
        >
          <ASwitch v-model="formData.keepAlive" type="round" :checked-text="t('common.yes')" :unchecked-text="t('common.no')" />
        </AFormItem>

        <AFormItem
          v-if="visibleByType([MenuTypeEnum.DIR, MenuTypeEnum.MENU])"
          :label="t('menu.visible')"
          field="visible"
        >
          <ASwitch v-model="formData.visible" type="round" :checked-text="t('common.yes')" :unchecked-text="t('common.no')" />
        </AFormItem>

        <AFormItem :label="t('menu.state')" field="state">
          <ASwitch v-model="formData.state" type="round" :checked-text="t('menu.enable')" :unchecked-text="t('menu.disable')" />
        </AFormItem>
      </AForm>
    </APageHeader>
    <AEmpty v-else class="h-full flex flex-col items-center justify-center" :description="t('menu.pleaseSelectMenu')" />
  </ASpin>
</template>

<style scoped lang="less">
:deep(.arco-page-header) {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;

  .arco-page-header-content {
    overflow: auto;
  }
}
</style>
