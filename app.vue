<template>
  <h1>{{ userStore.authorized }}</h1>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useUserStore } from './stores/user'
const userStore = useUserStore()
onMounted(() => {
  if (userStore.accessToken) {
    userStore.checkAuth()
  }
}),
</script>