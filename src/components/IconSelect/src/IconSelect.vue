<script setup lang="ts">
import { icons as mdiIcons } from '@iconify-json/mdi'

defineOptions({ name: 'IconSelect' })

const iconName = defineModel({ default: '' })

const sourceIcons = Object.keys(mdiIcons.icons)

const visible = ref(false)

const queryStr = ref('')
const filterIcons = ref<string[]>([])
const page = reactive({ pageNo: 1, pageSize: 50 })

watch(page, () => {
  query()
}, { immediate: true })

function query() {
  if (toValue(queryStr)) {
    filterIcons.value = sourceIcons.filter(item => item.includes(queryStr.value))
  } else {
    filterIcons.value = sourceIcons
  }
  if (toValue(filterIcons).length === 0) {
    page.pageNo = 1
  }
}

function handleIconClick(_iconName: string) {
  iconName.value = _iconName
  visible.value = false
}
</script>

<template>
  <AInput v-model="iconName" readonly allow-clear>
    <template v-if="iconName" #prefix>
      <RuntimeIcon class="text-18px" :name="iconName" />
    </template>

    <template #append>
      <AFormItem no-style>
        <APopover v-model:popup-visible="visible" trigger="click" position="bottom">
          <AButton type="primary">
            <template #icon>
              <i class="i-mdi-magnify text-18px" />
            </template>
          </AButton>

          <template #content>
            <AInput v-model="queryStr" class="!w-80%" allow-clear @press-enter="query">
              <template #append>
                <AButton type="primary" @click="query">
                  <template #icon>
                    <i class="i-mdi-magnify text-18px" />
                  </template>
                </AButton>
              </template>
            </AInput>

            <div v-show="filterIcons.length" class="icon-list">
              <RuntimeIcon
                v-for="item in filterIcons.slice((page.pageNo - 1) * page.pageSize, page.pageNo * page.pageSize)"
                :key="item"
                :name="item"
                @click="handleIconClick(item)"
              />
            </div>
            <AEmpty v-show="filterIcons.length === 0" />

            <APagination
              v-model:current="page.pageNo"
              v-model:page-size="page.pageSize"
              class="justify-center"
              :total="filterIcons.length"
              simple
            />
          </template>
        </APopover>
      </AFormItem>
    </template>
  </AInput>
</template>

<style scoped lang="less">
:deep(.arco-input-append) {
  padding: 0;
  border: none;
}

.icon-list {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  justify-items: center;
  gap: 10px;
  margin: 10px 0;
  font-size: 24px;

  & > i {
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      color: rgb(var(--primary-6));
    }
  }
}
</style>
