<script setup lang="ts">
import Logo from '../components/Logo'
import TopMenu from '../components/TopMenu'
import ToolBar from '../components/ToolBar'
import TabBar from '../components/TabBar'
import Menu from '../components/Menu'
import MainContent from '../components/MainContent'
import { useGlobalConfig } from '@/hooks'
import { useAppStore, useTopMenuStore } from '@/store'

defineOptions({ name: 'TopMix' })

const globalConfig = useGlobalConfig()
const appStore = useAppStore()
const topMenuStore = useTopMenuStore()

const headerHeight = computed(() => `${appStore.header.height}px`)
const siderWidth = computed(() => `${appStore.sider.width}px`)
const tabBarHeight = computed(() => `${appStore.tabBar.height}px`)
const footerHeight = computed(() => `${appStore.footer.height}px`)
</script>

<template>
  <ALayout class="h-full w-full">
    <ALayoutHeader>
      <Logo />
      <TopMenu />
      <ToolBar />
    </ALayoutHeader>

    <ALayout class="overflow-hidden">
      <ALayoutSider
        v-if="topMenuStore.menus.length"
        :width="appStore.sider.width"
        :collapsed-width="appStore.sider.collapsedWidth"
        breakpoint="xl"
        collapsible
      >
        <Menu :menus="topMenuStore.menus" />
      </ALayoutSider>

      <ALayout class="overflow-hidden">
        <TabBar v-if="appStore.tabBar.visible" />

        <ALayoutContent>
          <MainContent />
        </ALayoutContent>

        <ALayoutFooter v-if="appStore.footer.visible">
          {{ `Copyright © ${new Date().getFullYear()} ${globalConfig.appTitle}. All Rights Reserved.` }}
        </ALayoutFooter>
      </ALayout>
    </ALayout>
  </ALayout>
</template>

<style scoped lang="less">
.arco-layout-header {
  display: grid;
  grid-template-columns: v-bind(siderWidth) minmax(0, 1fr) auto;
  height: v-bind(headerHeight);
  border-bottom: 1px solid var(--color-border-2);
  overflow: hidden;
}

.tab-bar {
  height: v-bind(tabBarHeight);
}

.arco-layout-content {
  padding: 10px;
  background-color: var(--color-fill-1);
  overflow-x: hidden;
  overflow-y: auto;
}

.arco-layout-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: v-bind(footerHeight);
  color: var(--color-text-3);
}
</style>
