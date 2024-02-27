<script setup lang="ts">
defineOptions({
  name: 'About',
  title: '关于',
  desc: '一个基于Vite+Vue3+TS+Arco Design的开发模板',
})
</script>

<template>
  <ACard title="关于" hoverable>
    <p class="m-t-0 text-16px font-bold">
      Vue Template
    </p>
    <p>一个基于 Vite + Vue3 + TS + Arco Design 的开发模板</p>
    <a href="https://github.com/ben1289/VueTemplate" target="_blank">
      <img alt="stars" src="https://img.shields.io/github/stars/ben1289/VueTemplate">
    </a>
  </ACard>
</template>

<style scoped lang="less">
:deep(.arco-card-header) {
  padding-bottom: 0;
  border-bottom: none;

  .arco-card-header-title {
    font-weight: bold;
  }
}
</style>
