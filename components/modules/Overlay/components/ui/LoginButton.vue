<template>
  <NavButton
    @click="redirect"
    class="bg-black text-white"
    text="Вход"
    icon="material-symbols:login-rounded"
    data-testid="loginButton"
  />
</template>
<script setup lang="ts">
import NavButton from './NavButton.vue';

async function redirect() {
  await navigateTo('/login');
}
</script>
