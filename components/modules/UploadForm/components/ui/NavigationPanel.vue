<template>
  <div class="flex justify-between">
    <UiButton class="px-5 bg-black" @click="uploadStore.decrementPage()"
      >Назад</UiButton
    >
    <UiButton class="px-5 bg-black" @click="uploadStore.incrementPage()"
      >Далее</UiButton
    >
  </div>
</template>
<script setup lang="ts">
import useUploadStore from '@/components/modules/UploadForm/store';
const uploadStore = useUploadStore();
</script>
