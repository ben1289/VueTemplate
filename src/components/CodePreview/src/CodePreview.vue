<script setup lang="ts">
import type { CodePreviewProps } from './CodePreview'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

defineOptions({ name: 'CodePreview' })

const props = defineProps<CodePreviewProps>()

const html = DOMPurify.sanitize(hljs.highlightAuto(props.code, props.language).value)
</script>

<template>
  <pre><code class="hljs" v-html="html" /></pre>
</template>

<style scoped lang="less">

</style>
