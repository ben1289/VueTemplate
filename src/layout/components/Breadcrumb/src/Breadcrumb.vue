<script setup lang="ts">
defineOptions({ name: 'Breadcrumb' })

const route = useRoute()
</script>

<template>
  <ABreadcrumb>
    <template v-for="r in route.matched">
      <ABreadcrumbItem v-if="r.meta.title" :key="r.path">
        {{ (r.meta as any).title }}
      </ABreadcrumbItem>
    </template>
  </ABreadcrumb>
</template>

<style scoped lang="less">

</style>
