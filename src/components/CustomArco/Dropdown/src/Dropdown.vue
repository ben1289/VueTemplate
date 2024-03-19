<script setup lang="ts">
import type { DropdownProps } from './Dropdown'

defineOptions({ name: 'CusDropdown', inheritAttrs: false })

withDefaults(defineProps<DropdownProps>(), {
  options: () => [],
  group: () => [],
})
</script>

<template>
  <div class="batch-dropdown">
    <ADropdown trigger="hover" v-bind="$attrs">
      <slot name="trigger">
        <ALink :hoverable="false">
          <slot />
          <i class="i-mdi-chevron-down text-20px transition duration-300" />
        </ALink>
      </slot>
      <template #content>
        <ADoption
          v-for="(option, index) in options"
          :key="index"
          class="min-w-100px"
          :value="option"
          :disabled="disabled || option.disabled"
          @click="option.click"
        >
          {{ option.label }}
        </ADoption>

        <ADgroup
          v-for="grp in group"
          :key="grp.title"
          :title="grp.title"
        >
          <ADoption
            v-for="(option, index) in grp.options"
            :key="index"
            class="min-w-100px"
            :value="option"
            :disabled="disabled || option.disabled"
            @click="option.click"
          >
            {{ option.label }}
          </ADoption>
        </ADgroup>
      </template>
    </ADropdown>
  </div>
</template>

<style scoped lang="less">
.arco-dropdown-open .i-mdi-chevron-down {
  transform: rotate(180deg);
}
</style>
