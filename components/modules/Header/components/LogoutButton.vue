<template>
  <HeaderUiNavButton
    @click="logout"
    class="bg-red-500 text-white"
    text="Выход"
    icon="ri:logout-circle-r-fill"
  />
</template>
<script setup lang="ts">
import useAuthStore from '@/stores/auth';
import HeaderUiNavButton from './ui/NavButton.vue';
const authStore = useAuthStore();

async function logout() {
  await authStore.logout();
  await navigateTo('/');
}
</script>
