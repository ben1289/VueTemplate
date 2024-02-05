<script setup lang="ts">
defineOptions({ name: 'BoardLayoutThumbnail' })

const modelValue = defineModel<string>({ required: true })
</script>

<template>
  <div class="flex gap-15px">
    <div
      class="thumbnail grid-cols-[2fr_1fr_1fr]"
      :class="{ active: modelValue === 'Column' }"
      @click="modelValue = 'Column'"
    >
      <span />
      <span />
      <span />
    </div>

    <div
      class="thumbnail grid-rows-3"
      :class="{ active: modelValue === 'Row' }"
      @click="modelValue = 'Row'"
    >
      <span />
      <span />
      <span />
    </div>

    <div
      class="thumbnail grid-cols-[2fr_1fr] grid-rows-[1fr_2fr]"
      :class="{ active: modelValue === 'Mix' }"
      @click="modelValue = 'Mix'"
    >
      <span class="col-span-full" />
      <span />
      <span />
    </div>
  </div>
</template>

<style scoped lang="less">
.thumbnail {
  display: grid;
  gap: 3px;
  width: 60px;
  height: 60px;
  padding: 4px;
  border: 2px solid var(--color-border-3);
  transition: all 0.15s;
  cursor: pointer;

  &:hover {
    border-color: rgb(var(--primary-6));
  }

  span {
    background-color: var(--color-fill-3);
    transition: all 0.15s;
  }

  &.active {
    border-color: rgb(var(--primary-6));

    span {
      background-color: rgb(var(--primary-6));
    }
  }
}
</style>
