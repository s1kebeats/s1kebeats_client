<template>
  <LoginForm @success="onLoginSuccess" />
</template>
<script setup lang="ts">
import LoginForm from '@/components/modules/LoginForm/LoginForm.vue';
import useUiStore from '@/stores/ui';

const uiStore = useUiStore();

definePageMeta({
  layout: 'form',
  middleware: 'guest',
});

async function onLoginSuccess() {
  await navigateTo('/');
  setTimeout(() => uiStore.setLoading(false), 200);
}
</script>
