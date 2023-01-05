<template>
  <section
    class="w-[40%] bg-white flex flex-col items-center justify-center gap-7 px-[7.5%]"
  >
    <BaseFormHeader title="Регистрация" />
    <TheRegistrationForm @success="onRegistrationSuccess" />
    <TheRegistrationFooter />
  </section>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'form',
});

async function onRegistrationSuccess() {
  await navigateTo('/login');
}
</script>
