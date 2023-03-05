<template>
  <section
    class="w-[40%] bg-white flex flex-col items-center justify-center gap-7 px-[7.5%]"
  >
    <UiFormHeader title="Вход" />
    <LoginForm @success="onLoginSuccess" />
    <UiLoginFooter />
  </section>
</template>
<script setup lang="ts">
import LoginForm from '@/components/modules/LoginForm/LoginForm.vue';

definePageMeta({
  layout: 'form',
});

async function onLoginSuccess() {
  await navigateTo('/');
}
</script>
