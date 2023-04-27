<template>
  <HeaderUiNavButton
    @click="redirect"
    class="bg-[#7945fc] text-white"
    text="Регистрация"
    icon="ri:logout-circle-r-fill"
  />
</template>
<script setup lang="ts">
import HeaderUiNavButton from './ui/NavButton.vue';

async function redirect() {
  await navigateTo('/register');
}
</script>
