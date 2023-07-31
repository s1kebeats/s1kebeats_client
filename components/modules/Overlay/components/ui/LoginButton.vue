<template>
  <Button
    size="sm"
    class="grow"
    icon="material-symbols:login-rounded"
    data-testid="loginButton"
    @click="redirect"
    >Вход</Button
  >
</template>
<script setup lang="ts">
import { Button } from '@s1kebeats/s1kebeats-ui';

async function redirect() {
  await navigateTo('/login');
}
</script>
