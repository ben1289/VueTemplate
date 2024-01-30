<script setup lang="ts">
import FullScreen from '@/layout/components/FullScreen'
import Translate from '@/layout/components/Translate'
import UserInfo from '@/layout/components/UserInfo'

defineOptions({ name: 'ToolBar' })
</script>

<template>
  <div class="flex items-center gap-10px">
    <FullScreen />
    <Translate />
    <UserInfo />
  </div>
</template>

<style scoped lang="less">

</style>
