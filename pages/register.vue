<template>
  <RegistrationForm />
</template>
<script setup lang="ts">
import RegistrationForm from '@/components/modules/RegistrationForm';
definePageMeta({
  layout: 'form',
  middleware: ['guest-only'],
});
</script>
