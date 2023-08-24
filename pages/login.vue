<template>
  <LoginForm />
</template>
<script setup lang="ts">
import LoginForm from '@/components/modules/LoginForm';
definePageMeta({
  layout: 'form',
  middleware: ['guest-only'],
});
</script>
