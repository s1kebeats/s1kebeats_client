<template>
  <RegistrationForm
    @success="onRegistrationSuccess"
    data-testid="registrationForm"
  />
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
