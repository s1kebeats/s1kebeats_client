<template>
  <div class="w-full flex">
    <UiButton
      class="px-5 bg-black"
      @click="uploadStore.decrementPage()"
      v-if="uploadStore.page > 1"
      >Назад</UiButton
    >
    <UiButton
      class="ml-auto px-5 bg-black"
      @click="uploadStore.incrementPage()"
      v-if="uploadStore.page < 3"
      >Далее</UiButton
    >
  </div>
</template>
<script setup lang="ts">
import useUploadStore from '@/components/modules/UploadForm/store';
const uploadStore = useUploadStore();
</script>
