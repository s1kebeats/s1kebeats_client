<template>
  <main class="grow flex flex-col items-center w-full pt-5 gap-5">
    <UiPageTitle> Публикация </UiPageTitle>
    <BeatUploadForm />
  </main>
</template>
<script setup lang="ts">
import BeatUploadForm from '@/components/modules/UploadForm/UploadForm.vue';
</script>
