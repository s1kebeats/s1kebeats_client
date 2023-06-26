<template>
  <HeaderUiNavButton
    @click="logout"
    class="bg-red-500 text-white"
    text="Выход"
    icon="streamline:entertainment-control-button-power-1-power-button-on-off"
    data-testid="logoutButton"
  />
</template>
<script setup lang="ts">
import HeaderUiNavButton from './NavButton.vue';
import useAuthStore from '@/stores/auth';
import useUiStore from '@/stores/ui';

const authStore = useAuthStore();
const uiStore = useUiStore();

async function logout() {
  uiStore.setLoading(true);
  await authStore.logout();
  await navigateTo('/login');
  setTimeout(() => uiStore.setLoading(false), 200);
}
</script>
