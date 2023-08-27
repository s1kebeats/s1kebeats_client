<template>
  <LoginForm />
</template>
<script setup lang="ts">
import { LoginForm } from '@/components/modules';
definePageMeta({
  layout: 'form',
  middleware: ['guest-only'],
});
</script>
