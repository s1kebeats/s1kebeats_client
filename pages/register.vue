<template>
  <UiFormHeader title="Регистрация" />
  <RegistrationForm @success="onRegistrationSuccess" />
  <UiFormFooter to="/register" hint="Уже есть аккаунт?" link-title="Вход" />
</template>
<script setup lang="ts">
import RegistrationForm from '@/components/modules/RegistrationForm/RegistrationForm.vue';
import useUiStore from '@/stores/ui';

const uiStore = useUiStore();

definePageMeta({
  layout: 'form',
  middleware: 'guest',
});

async function onRegistrationSuccess() {
  await navigateTo('/login');
  setTimeout(() => uiStore.setLoading(false), 200);
}
</script>
