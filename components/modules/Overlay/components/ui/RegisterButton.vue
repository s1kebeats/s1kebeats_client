<template>
  <NavButton
    @click="redirect"
    class="bg-[#7945fc] text-white"
    text="Регистрация"
    icon="streamline:interface-user-add-actions-add-close-geometric-human-person-plus-single-up-user"
    data-testid="registerButton"
  />
</template>
<script setup lang="ts">
import NavButton from './NavButton.vue';

async function redirect() {
  await navigateTo('/register');
}
</script>
