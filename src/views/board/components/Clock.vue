<script setup lang="ts">
defineOptions({
  name: 'Clock',
  title: '时钟',
  desc: '显示当前时间',
})

const currentTime = ref(new Date())

setInterval(() => {
  currentTime.value = new Date()
}, 1000)
</script>

<template>
  <ACard title="时钟" hoverable>
    <AStatistic :value="currentTime" format="hh:mm:ss" :value-style="{ color: '#fff', fontSize: '38px', fontWeight: 'bold' }" />
    <br>
    <AStatistic :value="currentTime" format="YYYY年MM月DD日" :value-style="{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px' }" />
  </ACard>
</template>

<style scoped lang="less">
.arco-card {
  background: linear-gradient(90deg, #8e54e9, #4776e6);

  :deep(.arco-card-header) {
    padding-bottom: 0;
    border-bottom: none;

    .arco-card-header-title {
      color: #fff;
      font-weight: bold;
    }
  }

  :deep(.arco-card-body) {
    padding-top: 0;
  }
}
</style>
