<script setup lang="ts">
import type { TableColumnData } from '@arco-design/web-vue'
import type { FormSchema } from '@/components/QueryForm'
import ResetPwdModal from './resetPwdModal.vue'
import { useGotoView } from '@/components/ViewController'
import { CusTable } from '@/components/CustomArco'
import { CommonStateEnum, DictTypeEnum } from '@/enums'
import { getDictLabel, getDictOptions } from '@/utils/dict'
import { downloadByBlob } from '@/utils/download'
import { useMessage } from '@/hooks'
import * as userApi from '@/api/system/user'

defineOptions({ name: 'UserMain' })

const { t } = useI18n()
const message = useMessage()
const gotoView = useGotoView()

const formData = reactive({
  username: '',
  nickname: '',
  sex: '',
})
const formSchema: FormSchema[] = [
  {
    label: t('user.username'),
    field: 'username',
    component: 'input',
  },
  {
    label: t('user.nickname'),
    field: 'nickname',
    component: 'input',
  },
  {
    label: t('user.sex'),
    field: 'sex',
    component: 'select',
    componentAttrs: { options: getDictOptions(DictTypeEnum.USER_SEX) },
  },
]

const tbLoading = ref(false)
const tbCols: TableColumnData[] = [
  {
    title: t('user.username'),
    dataIndex: 'username',
  },
  {
    title: t('user.nickname'),
    dataIndex: 'nickname',
  },
  {
    title: t('user.sex'),
    dataIndex: 'sex',
    render: ({ record }) => getDictLabel(DictTypeEnum.USER_SEX, record.sex),
  },
  {
    title: t('user.role'),
    dataIndex: 'role',
  },
  {
    title: t('user.mobile'),
    dataIndex: 'mobile',
  },
  {
    title: t('user.email'),
    dataIndex: 'email',
  },
  {
    title: t('user.dept'),
    dataIndex: 'dept',
  },
  {
    title: t('user.state'),
    align: 'center',
    slotName: 'state',
  },
  {
    title: t('common.operate'),
    align: 'center',
    width: 160,
    slotName: 'operate',
  },
]
const tbData = ref([])
const tbPage = reactive({ pageNo: 1, pageSize: 20 })
const tbTotal = ref(0)

watch(tbPage, () => {
  query()
}, { immediate: true })

function query() {
  tbLoading.value = true
  userApi.getUserList({ ...tbPage, ...formData }).then((res) => {
    const { data } = res
    tbData.value = data.list
    tbTotal.value = data.total
  }).finally(() => {
    tbLoading.value = false
  })
}

function reset() {
  query()
}

function gotoAddEdit(id?: number) {
  gotoView('addEdit', { props: { id }, events: { refresh: query } })
}

function handleExport() {
  message.confirm(t('user.exportTip'), {
    onOk() {
      userApi.exportUser().then((res) => {
        downloadByBlob(res, t('user.exportXlsx'))
      })
    },
  })
}

function handleBeforeStateChange(state: any) {
  return new Promise<boolean>((resolve) => {
    message.confirm(t(state ? 'user.enableTip' : 'user.disableTip'), {
      onOk() {
        resolve(true)
      },
      onCancel() {
        resolve(false)
      },
    })
  })
}

function handleStateChange(id: number, state: boolean) {
  userApi.updateUserState({ id, state }).catch(() => {
    query()
  })
}

const resetPwdModalRef = ref<InstanceType<typeof ResetPwdModal>>()
function handleResetPwd(id: number) {
  toValue(resetPwdModalRef)?.open(id)
}

function handleDelete(id: number) {
  message.confirm(t('user.deleteTip'), {
    onOk() {
      userApi.deleteUser(id).then(() => {
        message.success(t('tip.deleteSuccess'))
        query()
      })
    },
  })
}
</script>

<template>
  <div class="grid grid-rows-[auto_minmax(0,_1fr)] h-full gap-10px">
    <div class="card">
      <QueryForm :model="formData" :schema="formSchema" @query="query" @reset="reset" />
    </div>
    <div class="card grid grid-rows-[auto_minmax(0,_1fr)] gap-10px">
      <ASpace>
        <AButton type="outline" @click="gotoAddEdit()">
          {{ t('action.add') }}
        </AButton>
        <AButton type="outline" @click="handleExport">
          {{ t('action.export') }}
        </AButton>
      </ASpace>
      <CusTable
        v-model:page="tbPage"
        :loading="tbLoading"
        :columns="tbCols"
        :data="tbData"
        :total="tbTotal"
        row-key="id"
      >
        <template #state="{ record }">
          <ASwitch
            v-model="record.state"
            type="round"
            :checked-value="CommonStateEnum.ENABLE"
            :unchecked-value="CommonStateEnum.DISABLE"
            :before-change="handleBeforeStateChange"
            @change="handleStateChange(record.id, $event as boolean)"
          />
        </template>

        <template #operate="{ record }">
          <AButton type="text" @click="gotoAddEdit(record.id)">
            {{ t('action.edit') }}
          </AButton>

          <ADropdown>
            <AButton type="text">
              {{ t('common.more') }}
            </AButton>
            <template #content>
              <ADoption @click="handleResetPwd(record.id)">
                <template #icon>
                  <i class="i-mdi-lock-reset" />
                </template>
                {{ t('user.resetPwd') }}
              </ADoption>
              <ADoption @click="handleDelete(record.id)">
                <template #icon>
                  <i class="i-mdi-delete-outline" />
                </template>
                {{ t('action.delete') }}
              </ADoption>
            </template>
          </ADropdown>
        </template>
      </CusTable>
    </div>

    <ResetPwdModal ref="resetPwdModalRef" />
  </div>
</template>

<style scoped lang="less">

</style>
