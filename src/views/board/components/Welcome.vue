<script setup lang="ts">
defineOptions({
  name: 'Welcome',
  title: '欢迎',
  desc: '欢迎使用',
})
</script>

<template>
  <ACard title="欢迎" hoverable>
    <p class="m-t-0">
      ✨ Features
    </p>
    <ul>
      <li><p>TypeScript - The code is completely written in TypeScript.</p></li>
      <li><p>Vue3 - Look to the future and embrace Vue3.</p></li>
      <li><p>Pinia - It's trendy and delicious.</p></li>
      <li><p>Arco Design - Powered by ArcoDesign Vue component library.</p></li>
      <li><p>I18n - Built-in internationalized multi-language solution.</p></li>
    </ul>
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
