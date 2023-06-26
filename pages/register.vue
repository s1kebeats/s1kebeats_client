<template>
  <UiFormHeader title="Регистрация" />
  <RegistrationForm />
  <UiRegistrationFooter />
</template>
<script setup lang="ts">
import RegistrationForm from '@/components/modules/RegistrationForm/RegistrationForm.vue';

definePageMeta({
  layout: 'form',
  middleware: 'guest',
});
</script>
