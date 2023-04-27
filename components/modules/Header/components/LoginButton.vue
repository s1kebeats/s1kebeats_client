<template>
  <HeaderUiNavButton
    @click="redirect"
    class="bg-black text-white"
    text="Вход"
    icon="material-symbols:login-rounded"
  />
</template>
<script setup lang="ts">
import HeaderUiNavButton from './ui/NavButton.vue';

async function redirect() {
  await navigateTo('/login');
}
</script>
