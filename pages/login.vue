<template>
  <section
    class="w-[40%] bg-white flex flex-col items-center justify-center gap-7 px-[7.5%]"
  >
    <BaseFormHeader title="Вход" />
    <TheLoginForm @success="onLoginSuccess" />
    <TheLoginFooter />
  </section>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'form',
});

async function onLoginSuccess() {
  await navigateTo('/');
}
</script>
