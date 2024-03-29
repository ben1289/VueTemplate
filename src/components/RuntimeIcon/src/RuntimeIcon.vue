<script setup lang="ts">
import type { IconProps } from '@/components/RuntimeIcon/src/RuntimeIcon'
import { icons } from '@iconify-json/mdi'
import { encodeSvgForCss, getIconData, iconToHTML, iconToSVG } from '@iconify/utils'

defineOptions({ name: 'RuntimeIcon' })

const props = defineProps<IconProps>()

const url = computed(() => {
  const iconData = getIconData(icons, props.name)
  if (iconData) {
    const renderData = iconToSVG(iconData)
    const svg = iconToHTML(renderData.body, renderData.attributes)
    return `url("data:image/svg+xml;utf8,${encodeSvgForCss(svg)}")`
  }
  return ''
})
</script>

<template>
  <i v-if="url" />
</template>

<style scoped lang="less">
i {
  --icon: v-bind(url);
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: middle;
  color: inherit;
  background-color: currentColor;
  -webkit-mask: var(--icon) no-repeat;
  mask: var(--icon) no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}
</style>
