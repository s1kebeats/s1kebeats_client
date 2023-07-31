<template>
  <Button
    size="sm"
    class="grow"
    type="secondary"
    icon="streamline:interface-user-add-actions-add-close-geometric-human-person-plus-single-up-user"
    data-testid="registerButton"
    @click="redirect"
    >Регистрация</Button
  >
</template>
<script setup lang="ts">
import { Button } from '@s1kebeats/s1kebeats-ui';

async function redirect() {
  await navigateTo('/register');
}
</script>
