<script setup lang="ts">
import Logo from './components/Logo'
import ModuleMenu from './components/ModuleMenu'
import ToolBar from './components/ToolBar'
import TabBar from './components/TabBar'
import Menu, { Collapse } from './components/Menu'
import MainContent from './components/MainContent'
import { useGlobalConfig } from '@/hooks'

defineOptions({ name: 'Layout' })

const globalConfig = useGlobalConfig()
</script>

<template>
  <section class="layout-container">
    <header class="layout-header">
      <Logo />
      <ModuleMenu />
      <ToolBar />
    </header>

    <aside class="layout-aside">
      <Menu />
      <Collapse class="icon-btn w-full" />
    </aside>

    <TabBar />

    <main class="layout-main">
      <MainContent />

      <footer>
        {{ `Copyright © ${new Date().getFullYear()} ${globalConfig.appTitle}. All Rights Reserved.` }}
      </footer>
    </main>
  </section>
</template>

<style scoped lang="less">
.layout-container {
  display: grid;
  grid-template-areas:
    'header header'
    'aside tabBar'
    'aside main';
  grid-template-rows: var(--layout-header-height) minmax(0, 30px) minmax(0, 1fr);
  grid-template-columns: auto minmax(0, 1fr);
  width: 100%;
  height: 100%;

  .layout-header {
    grid-area: header;
    display: grid;
    grid-template-columns: var(--layout-aside-width) minmax(0, 1fr) auto;
    color: var(--layout-header-text-color);
    background-color: var(--layout-header-bg-color);
    border-bottom: 1px solid var(--color-border-2);
    overflow: hidden;
  }

  .layout-aside {
    grid-area: aside;
    display: grid;
    grid-template-rows: minmax(0, 1fr) auto;
    background-color: var(--layout-aside-bg-color);
  }

  .layout-main {
    grid-area: main;
    display: flex;
    flex-direction: column;
    background-color: var(--layout-main-bg-color);
    overflow-x: hidden;
    overflow-y: auto;

    & > .fixed-full {
      flex: 1;
      padding: 10px;
      overflow: hidden;
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

  :deep(.icon-btn) {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: calc(var(--layout-header-height) / 2);
    min-height: calc(var(--layout-header-height) / 2);
    color: var(--color-text-2);
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      backdrop-filter: brightness(0.95);
    }
  }
}
</style>
