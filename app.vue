<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useUserStore } from './stores/user'
const userStore = useUserStore()
onMounted(() => {
  if (localStorage.getItem('accessToken')) {
    userStore.checkAuth()
  }
})
</script>
