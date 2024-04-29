<script setup lang="ts">
import type { CodePreviewProps } from './CodePreview'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js'
import { useClipboard } from '@vueuse/core'
import 'highlight.js/styles/github.css'
import { useMessage } from '@/hooks'

defineOptions({ name: 'CodePreview' })

const props = defineProps<CodePreviewProps>()

const { t } = useI18n()
const message = useMessage()
const { copy } = useClipboard({ source: props.code, legacy: true })

const html = DOMPurify.sanitize(hljs.highlightAuto(props.code, props.language).value)

function handleCopy() {
  copy().then(() => {
    message.success(t('codePreview.copySuccess'))
  })
}
</script>

<template>
  <div class="code-preview">
    <AButton type="outline" @click="handleCopy">
      <template #icon>
        <i class="i-mdi-content-copy" />
      </template>
    </AButton>
    <pre><code class="hljs" v-html="html" /></pre>
  </div>
</template>

<style scoped lang="less">
.code-preview {
  position: relative;

  &,
  pre,
  .hljs {
    height: 100%;
  }

  .arco-btn-outline {
    position: absolute;
    right: 10px;

    &,
    &:hover {
      background-color: var(--color-bg-1);
    }
  }

  pre {
    margin: 0;
  }

  .hljs {
    padding-top: 0;
    padding-bottom: 0;
    overflow: auto;
  }
}
</style>
