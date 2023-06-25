<template>
  <HeaderUiNavButton
    @click="redirect"
    class="bg-black text-white"
    text="Вход"
    icon="material-symbols:login-rounded"
    data-testid="loginButton"
  />
</template>
<script setup lang="ts">
import HeaderUiNavButton from './NavButton.vue';

async function redirect() {
  await navigateTo('/login');
}
</script>
