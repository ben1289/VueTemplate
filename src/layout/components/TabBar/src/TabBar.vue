<script setup lang="ts">
import type { DropdownInstance, ScrollbarInstance } from '@arco-design/web-vue'
import type { RouteLocation } from 'vue-router'
import { useGlobalConfig } from '@/hooks'
import { useTabRouteStore } from '@/store'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const globalConfig = useGlobalConfig()
const tabRouteStore = useTabRouteStore()

const scrollbarRef = ref<ScrollbarInstance>()
const dropdownRef = ref<DropdownInstance[]>()

watch(route, () => {
  tabRouteStore.addRoute(route)
}, { immediate: true })

// 是否可关闭
const closable = (tabRoute: RouteLocation) => tabRoute.path !== globalConfig.homePath
// 是否为当前路由
const isCurtRoute = (tabRoute: RouteLocation) => tabRoute.path === route.path

const leftOffset = ref(0)

/**
 * 设置滚动条偏移量
 * @param offset
 */
function handleScroll(offset: number) {
  toValue(scrollbarRef)?.scrollLeft(toValue(leftOffset) + offset)
}

/**
 * 刷新
 * @param tabRoute
 */
function refresh(tabRoute: RouteLocation) {
  router.replace({ path: `/redirect${tabRoute.path}`, query: tabRoute.query })
}

/**
 * 关闭
 * @param tabRoute
 */
function closeTab(tabRoute: RouteLocation) {
  tabRouteStore.removeRoute(tabRoute)
  if (tabRoute.fullPath === route.fullPath) {
    const nextRoute = tabRouteStore.routes.at(-1)
    if (nextRoute) {
      router.push(nextRoute)
    }
  }
}

/**
 * 关闭其它
 * @param tabRoute
 */
function closeOtherTab(tabRoute: RouteLocation) {
  tabRouteStore.removeOtherRoute(tabRoute)
  router.push(tabRoute)
}

/**
 * 关闭所有
 */
function closeAllTab() {
  tabRouteStore.removeAllRoute()
  router.push(router.resolve(globalConfig.homePath))
}

function handleSelect(value: any, tabRoute: RouteLocation) {
  switch (value) {
    case 'refresh': {
      refresh(tabRoute)
      break
    }
    case 'close': {
      closeTab(tabRoute)
      break
    }
    case 'closeOther': {
      closeOtherTab(tabRoute)
      break
    }
    case 'closeAll': {
      closeAllTab()
      break
    }
  }
}
</script>

<template>
  <div class="tab-bar">
    <span class="tab-bar-btn !border-l-none" @click="handleScroll(-200)"><i class="i-mdi-chevron-double-left text-22px" size="20" /></span>
    <AScrollbar
      ref="scrollbarRef"
      class="h-full inline-flex gap-5px overflow-auto"
      outer-class="flex-1 p-[2px_5px]"
      @scroll="({ target }) => leftOffset = (target as Element).scrollLeft"
    >
      <ADropdown
        v-for="(tabRoute) in tabRouteStore.routes"
        :key="tabRoute.fullPath"
        ref="dropdownRef"
        class="shrink-0"
        trigger="contextMenu"
        @select="handleSelect($event, tabRoute)"
      >
        <span
          class="tab-bar-item"
          :class="{ active: route.fullPath === tabRoute.fullPath }"
          @click="router.push(tabRoute)"
        >
          {{ (tabRoute.meta as any)?.title }}<i v-if="closable(tabRoute)" class="i-mdi-close m-y-auto" @click.stop="closeTab(tabRoute)" />
        </span>
        <template #content>
          <ADoption value="refresh" :disabled="!isCurtRoute(tabRoute)">
            {{ t('common.refresh') }}
          </ADoption>
          <ADoption value="close" :disabled="!closable(tabRoute)">
            {{ t('common.close') }}
          </ADoption>
          <ADoption value="closeOther" :disabled="!isCurtRoute(tabRoute)">
            {{ t('tabBar.closeOther') }}
          </ADoption>
          <ADoption value="closeAll">
            {{ t('tabBar.closeAll') }}
          </ADoption>
        </template>
      </ADropdown>
    </AScrollbar>
    <span class="tab-bar-btn !border-r-none" @click="handleScroll(200)"><i class="i-mdi-chevron-double-right text-22px" size="20" /></span>
    <span class="tab-bar-btn !border-r-none" @click="refresh(route)"><i class="i-mdi-refresh text-22px" size="20" /></span>
    <ADropdown trigger="click" @select="handleSelect($event, route)">
      <span class="tab-bar-btn !border-r-none"><i class="i-mdi-view-grid text-22px" size="20" /></span>
      <template #content>
        <ADoption value="refresh">
          {{ t('common.refresh') }}
        </ADoption>
        <ADoption value="close">
          {{ t('common.close') }}
        </ADoption>
        <ADoption value="closeOther">
          {{ t('tabBar.closeOther') }}
        </ADoption>
        <ADoption value="closeAll">
          {{ t('tabBar.closeAll') }}
        </ADoption>
      </template>
    </ADropdown>
  </div>
</template>

<style scoped lang="less">
.tab-bar {
  display: flex;
  border-top: 1px solid var(--color-border-2);
  border-bottom: 1px solid var(--color-border-2);
  overflow: hidden;

  .tab-bar-btn {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 6px;
    color: var(--color-text-2);
    border-left: 1px solid var(--color-border-2);
    border-right: 1px solid var(--color-border-2);
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: var(--color-text-1);
    }
  }

  .tab-bar-item {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    padding: 0 14px;
    border: 1px solid var(--color-border-2);
    border-radius: 2px;
    cursor: pointer;
    transition: padding 0.3s;

    &.active {
      color: #fff;
      background-color: rgb(var(--primary-5));
      border-color: rgb(var(--primary-5));
    }

    .i-mdi-close {
      width: 0;
      transition: all 0.3s;
    }

    &:has(.i-mdi-close):hover {
      padding: 0 6px;

      .i-mdi-close {
        width: 1em;
        margin-left: 2px;
      }
    }
  }

  :deep(.arco-scrollbar) {
    .arco-scrollbar-container {
      scroll-behavior: smooth;
    }

    &:hover .arco-scrollbar-container {
      scroll-behavior: auto;
    }
  }
}
</style>