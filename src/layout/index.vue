<script setup lang="ts">
import Logo from './components/Logo'
import ToolBar from './components/ToolBar'
import TabBar from './components/TabBar'
import Menu, { Collapse } from './components/Menu'
import { LayoutModeEnum } from '@/enums'
import { useGlobalConfig } from '@/hooks'
import { useAppStore, useTabRouteStore } from '@/store'

defineOptions({ name: 'Layout' })

const globalConfig = useGlobalConfig()
const appStore = useAppStore()
const tabRouteStore = useTabRouteStore()
</script>

<template>
  <section class="layout-container" :class="appStore.layoutMode">
    <header class="layout-header">
      <Logo v-if="appStore.layoutMode === LayoutModeEnum.HEADER_FULL" />
      <ToolBar />
      <TabBar />
    </header>

    <aside class="layout-aside">
      <Logo v-if="appStore.layoutMode === LayoutModeEnum.ASIDE_FULL" />
      <Collapse v-else class="m-a" />
      <Menu />
    </aside>

    <main class="layout-main">
      <RouterView v-slot="{ Component, route }">
        <Transition name="right-slide">
          <KeepAlive :include="[...tabRouteStore.keepAliveComponents]">
            <component :is="Component" :key="route.fullPath" />
          </KeepAlive>
        </Transition>
      </RouterView>

      <footer>
        {{ `Copyright © ${new Date().getFullYear()} ${globalConfig.appTitle}. All Rights Reserved.` }}
      </footer>
    </main>
  </section>
</template>

<style scoped lang="less">
.layout-container {
  display: grid;
  grid-template-rows: var(--layout-header-height) minmax(0, 1fr);
  grid-template-columns: auto minmax(0, 1fr);
  width: 100%;
  height: 100%;

  .layout-header {
    grid-area: header;
    display: grid;
    grid-template-rows: repeat(2, minmax(0, 1fr));
    color: var(--layout-header-text-color);
    background-color: var(--layout-header-bg-color);
  }

  .layout-aside {
    grid-area: aside;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    background-color: var(--layout-aside-bg-color);
  }

  .layout-main {
    grid-area: main;
    display: flex;
    flex-direction: column;
    background-color: var(--layout-main-bg-color);
    overflow: auto;

    & > .fixed-full {
      flex: 1;
      padding: 10px;
      overflow: hidden;
    }

    .right-slide-enter-active {
      transition: transform 0.3s ease;
    }

    .right-slide-enter-from {
      transform: translateX(100%);
    }

    & > footer {
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: var(--layout-footer-height);
      margin-top: auto;
      color: var(--layout-footer-text-color);
      background-color: var(--layout-footer-bg-color);
    }
  }
}

.layout-container.header-full {
  grid-template-areas:
    'header header'
    'aside main';

  .layout-header {
    grid-template-columns: var(--layout-aside-width) minmax(0, 1fr);

    .layout-logo {
      grid-row: 1 / -1;
    }
  }
}

.layout-container.aside-full {
  grid-template-areas:
    'aside header'
    'aside main';
}
</style>
