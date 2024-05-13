<script setup lang="ts">
import type { RichEditorProps } from './RichEditor'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce'
import 'tinymce/themes/silver'
import 'tinymce/icons/default'
import 'tinymce/models/dom'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/media'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/table'

defineOptions({ name: 'RichEditor' })

const props = withDefaults(defineProps<RichEditorProps>(), {
  plugins: 'advlist code codesample directionality fullscreen image link lists media pagebreak preview searchreplace table',
  toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough forecolor backcolor align lineheight numlist bullist outdent indent removeformat pagebreak | link table image media codesample | fullscreen code preview print',
  width: '100%',
  height: '100%',
})

const init = {
  license_key: 'gpl',
  language_url: '/tinymce/langs/zh_CN.js',
  language: 'zh_CN',
  skin_url: '/tinymce/skins/ui/oxide',
  content_css: '/tinymce/skins/content/default/content.css',
  plugins: props.plugins,
  toolbar: props.toolbar,
  width: props.width,
  height: props.height,
  menubar: false,
  statusbar: true,
  elementpath: true,
  branding: false,
  resize: true,
}
</script>

<template>
  <Editor :init="init" />
</template>

<style scoped lang="less">

</style>
