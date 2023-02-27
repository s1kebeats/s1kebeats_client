<template>
  <button
    @click="logout"
    class="w-full text-right text-sm text-red-500 font-bold flex items-center justify-start gap-3"
  >
    <Icon name="uiw:circle-close" size="18px" />
    <span> Выйти </span>
  </button>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

async function logout() {
  await userStore.logout();
  await navigateTo('/');
}
</script>
