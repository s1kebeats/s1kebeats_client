<template>
  <TheRegistrationSection />
</template>
<script setup lang="ts">
import { useUserStore } from '~/stores/user';
const userStore = useUserStore();
definePageMeta({
  layout: 'form',
});
onBeforeMount(async () => {
  if (userStore.authorized) {
    await navigateTo('/profile');
  }
});
</script>
