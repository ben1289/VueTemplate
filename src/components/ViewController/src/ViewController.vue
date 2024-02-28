<script setup lang="ts">
import type { Attrs } from './hooks/gotoView'
import { GOTO_VIEW } from './hooks/gotoView'
import { useGlobImport } from '@/hooks'

defineOptions({ name: 'ViewController' })

const props = defineProps<{
  views: Record<string, any>
  defaultView: string
  keepAlive?: boolean
  include?: string | RegExp | (string | RegExp)[]
  exclude?: string | RegExp | (string | RegExp)[]
}>()

const _view = ref<string>(props.defaultView)
const _attrs = ref<Attrs>({})

function gotoView(view: string, attrs: Attrs = {}) {
  _view.value = view
  _attrs.value = attrs
}

provide(GOTO_VIEW, gotoView)

const component = useGlobImport(props.views, _view)

// 当component发生变化时，再更新attrs，以便解决组件传参警告
const attrs: typeof _attrs = ref({})
watch(component, () => {
  const { props = {}, events = {} } = toValue(_attrs)
  attrs.value = { props, events }
}, { immediate: true })
</script>

<template>
  <KeepAlive v-if="keepAlive" :include="include" :exclude="exclude">
    <component :is="component" v-bind="attrs.props" v-on="attrs.events" />
  </KeepAlive>
  <component :is="component" v-else v-bind="attrs.props" v-on="attrs.events" />
</template>

<style scoped lang="less">

</style>
