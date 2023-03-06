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

const route = useRoute();

const guestOnly = ['/login', '/register'];
const authOnly = ['/settings'];

onMounted(async () => {
  if (localStorage.getItem('accessToken')) {
    try {
      await authStore.checkAuth();

      if (guestOnly.includes(route.path)) {
        await navigateTo('/');
      }
    } catch (error: any) {
      if (authOnly.includes(route.path)) {
        await navigateTo('/login');
      }
    } finally {
      uiStore.setLoading(false);
    }
  }
});
</script>
