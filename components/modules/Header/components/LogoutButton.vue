<template>
  <button
    @click="logout"
    class="w-full text-right text-sm text-red-500 font-medium flex items-center justify-start gap-3"
  >
    <Icon name="uiw:circle-close" size="18px" />
    <span> Выйти </span>
  </button>
</template>
<script setup lang="ts">
import useAuthStore from '@/stores/auth'
const authStore = useAuthStore();

async function logout() {
  await authStore.logout();
  await navigateTo('/');
}
</script>
