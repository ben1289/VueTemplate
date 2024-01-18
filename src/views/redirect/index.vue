<script setup lang="ts">
defineOptions({ name: 'Redirect' })

const router = useRouter()
const route = useRoute()
const { params, query } = route
router.replace({ path: `${params.path || '/'}`, query })
</script>

<template>
  <ASpin />
</template>
