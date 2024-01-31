<script setup lang="ts">
defineOptions({ name: 'Home' })

const { t } = useI18n()
</script>

<template>
  <ASpace class="w-full" direction="vertical" :size="16">
    <ARow>
      <ACol>
        <ACard class="h-200px" :bordered="false">
          <h2>{{ t('home.welcome') }}</h2>
        </ACard>
      </ACol>
    </ARow>
    <ARow>
      <ACol>
        <ACard class="h-200px" :bordered="false" />
      </ACol>
    </ARow>
    <ARow :gutter="20">
      <ACol :span="14">
        <ACard class="h-200px" :bordered="false" />
      </ACol>
      <ACol :span="10">
        <ACard class="h-200px" :bordered="false" />
      </ACol>
    </ARow>
    <ARow>
      <ACol>
        <ACard class="h-200px" :bordered="false" />
      </ACol>
    </ARow>
  </ASpace>
</template>

<style scoped lang="less">

</style>
