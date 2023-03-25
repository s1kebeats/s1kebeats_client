<template>
  <UiFormHeader title="Вход" />
  <LoginForm @success="onLoginSuccess" />
  <UiLoginFooter />
</template>
<script setup lang="ts">
import LoginForm from '@/components/modules/LoginForm/LoginForm.vue';

definePageMeta({
  layout: 'form',
});

async function onLoginSuccess() {
  await navigateTo('/');
}
</script>
