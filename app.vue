<template>
  <UiLoadingScreen :loading="uiStore.loading" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import useUiStore from './stores/ui';
import useAuthStore from './stores/auth';
const uiStore = useUiStore();
const authStore = useAuthStore();

onMounted(async () => {
  if (localStorage.getItem('accessToken')) {
    try {
      await authStore.checkAuth();
    } catch (error: any) {
      // console.log(error.message);
    } finally {
      uiStore.setLoading(false);
    }
  }
});
</script>
