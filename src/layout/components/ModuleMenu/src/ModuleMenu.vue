<script setup lang="ts">

</script>

<template>
  <AMenu mode="horizontal" :default-selected-keys="['1']">
    <AMenuItem key="1">
      Module1
    </AMenuItem>
    <AMenuItem key="2">
      Module2
    </AMenuItem>
    <AMenuItem key="3">
      Module3
    </AMenuItem>
    <AMenuItem key="4">
      Module4
    </AMenuItem>
  </AMenu>
</template>

<style scoped lang="less">
.arco-menu {
  :deep(.arco-menu-inner) {
    padding: 0;
  }

  .arco-menu-item:not(.arco-menu-item + .arco-menu-item) {
    margin-left: 0;
  }
}
</style>
