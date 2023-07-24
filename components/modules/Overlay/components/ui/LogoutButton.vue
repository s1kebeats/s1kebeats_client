<template>
  <Button
    size="sm"
    type="secondary"
    icon="material-symbols:logout-rounded"
    data-testid="logoutButton"
    @click="logout"
    >Выход</Button
  >
</template>
<script setup lang="ts">
import { Button } from '@s1kebeats/s1kebeats-ui';
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
