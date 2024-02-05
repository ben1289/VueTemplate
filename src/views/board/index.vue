<script setup lang="ts">
import type { NestedArray } from './types'
import { useElementSize } from '@vueuse/core'
import Thumbnail from './layout/Thumbnail.vue'
import { GET_COMPONENT, REMOVE_COMPONENT } from './injectKeys'
import { useGlobImport, useStorage } from '@/hooks'

defineOptions({ name: 'Board' })

const storage = useStorage()

// 自定义布局
const boardRef = ref<HTMLElement>()
const { width: boardWidth } = useElementSize(boardRef)
const DRAWER_WIDTH = 360
const scale = computed(() => 1 - DRAWER_WIDTH / toValue(boardWidth))
const customMode = ref(false)

// 布局
const globLayouts = import.meta.glob(['./layout/*.vue', '!**/Thumbnail.vue'], { import: 'default' })
const layoutName = ref('Column')
const layout = useGlobImport(globLayouts, layoutName)

// 组件
const globComponents = import.meta.glob<any>(['./components/*.vue'], { import: 'default', eager: true })
const componentNames = ref<NestedArray<string>>([[], [], []])

provide(GET_COMPONENT, (name: string) => useGlobImport(globComponents, name, { eager: true, needRaw: true }))
provide(REMOVE_COMPONENT, (name: string) => {
  componentNames.value = toValue(componentNames).map(names => names.filter(n => n !== name)) as NestedArray<string>
})

/**
 * 初始化
 */
async function init() {
  layoutName.value = await storage.indexedDB.getItem('boardLayout') ?? 'Column'
  componentNames.value = await storage.indexedDB.getItem('boardComponents') ?? [[], [], []]
}
init()

function addComponent(name: string) {
  componentNames.value[0].push(name)
}

function save() {
  if (toValue(customMode)) {
    storage.indexedDB.setItem('boardLayout', layoutName.value)
    storage.indexedDB.setItem('boardComponents', toRaw(componentNames.value))
  }
  customMode.value = !toValue(customMode)
}

function cancel() {
  init()
  customMode.value = false
}
</script>

<template>
  <div ref="boardRef" class="board" :class="{ 'has-drawer': customMode }">
    <div class="board-content">
      <div class="m-b-10px text-right">
        <AButton type="primary" @click="save">
          <template #icon>
            <i v-if="customMode" class="i-mdi-checkbox-marked-circle-outline" />
            <i v-else class="i-mdi-view-dashboard-edit" />
          </template>
          {{ customMode ? '完成' : '自定义' }}
        </AButton>
      </div>

      <div class="content-wrapper">
        <component :is="layout" v-model="componentNames" :custom-mode="customMode" />
      </div>
    </div>

    <ACard v-if="customMode" class="board-drawer" title="自定义">
      <template #extra>
        <AButton type="text" shape="circle" size="mini" @click="cancel">
          <template #icon>
            <i class="i-mdi-close text-[var(--color-text-1)]" />
          </template>
        </AButton>
      </template>

      <div class="grid grid-rows-[repeat(3,_auto)_1fr] h-full">
        <ADivider orientation="left">
          布局
        </ADivider>

        <Thumbnail v-model="layoutName" />

        <ADivider orientation="left">
          组件
        </ADivider>

        <AList :bordered="false" :split="false" hoverable>
          <AListItem
            v-for="component in Object.values(globComponents).filter(comp => !componentNames.flat().includes(comp.name))"
            :key="component.name"
          >
            <AListItemMeta :title="component.title" :description="component.desc" />

            <template #actions>
              <AButton type="primary" @click="addComponent(component.name)">
                <template #icon>
                  <i class="i-mdi-plus text-22px" />
                </template>
              </AButton>
            </template>
          </AListItem>
        </AList>
      </div>
    </ACard>
  </div>
</template>

<style scoped lang="less">
.board {
  display: flex;
  gap: 10px;
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow-y: auto;

  .board-content {
    flex: 1;
    display: flex;
    flex-direction: column;

    .content-wrapper {
      flex: 1;
      transform-origin: left top;
      transition: transform 0.15s;
    }
  }

  &.has-drawer .content-wrapper {
    margin-right: calc(v-bind(DRAWER_WIDTH) * -1px);
    transform: scale(v-bind(scale));
  }

  .board-drawer {
    display: grid;
    grid-template-rows: auto 1fr;
    width: calc(v-bind(DRAWER_WIDTH) * 1px);
    height: 100%;
  }
}

.thumbnail {
  display: grid;
  gap: 4px;
  width: 60px;
  height: 60px;
  padding: 4px;
  border: 2px solid var(--color-border-3);
  transition: all 0.15s;
  cursor: pointer;

  &:hover {
    border-color: rgb(var(--primary-6));
  }

  span {
    background-color: var(--color-fill-3);
  }
}
</style>
