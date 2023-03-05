<template>
  <section
    class="w-[40%] bg-white flex flex-col items-center justify-center gap-7 px-[7.5%]"
  >
    <UiFormHeader title="Регистрация" />
    <RegistrationForm @success="onRegistrationSuccess" />
    <UiRegistrationFooter />
  </section>
</template>
<script setup lang="ts">
import RegistrationForm from '~~/components/modules/RegistrationForm/RegistrationForm.vue';

definePageMeta({
  layout: 'form',
});

async function onRegistrationSuccess() {
  await navigateTo('/login');
}
</script>
