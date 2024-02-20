<script setup lang="ts">
import useGotoView from './hooks/gotoView'
import { useGlobImport } from '@/hooks'

defineOptions({ name: 'ViewController' })

const props = defineProps<{
  views: Record<string, any>
  defaultView: string
  keepAlive?: boolean
  include?: string | RegExp | (string | RegExp)[]
  exclude?: string | RegExp | (string | RegExp)[]
}>()

const { view, attrs } = useGotoView(props.defaultView)
const component = useGlobImport(props.views, view)

// 当component发生变化时，再更新attrs
const _attrs: typeof attrs = ref({})
watch(component, () => {
  _attrs.value = toValue(attrs)
}, { immediate: true })
</script>

<template>
  <KeepAlive v-if="keepAlive" :include="include" :exclude="exclude">
    <component :is="component" v-bind="_attrs.props" v-on="_attrs.events" />
  </KeepAlive>
  <component :is="component" v-else v-bind="_attrs.props" v-on="_attrs.events" />
</template>

<style scoped lang="less">

</style>
