<template>
  <HeaderUiNavButton
    @click="logout"
    class="bg-red-500 text-white"
    text="Выход"
    icon="streamline:entertainment-control-button-power-1-power-button-on-off"
  />
</template>
<script setup lang="ts">
import useAuthStore from '@/stores/auth';
import HeaderUiNavButton from './NavButton.vue';
const authStore = useAuthStore();

async function logout() {
  await authStore.logout();
  await navigateTo('/');
}
</script>
