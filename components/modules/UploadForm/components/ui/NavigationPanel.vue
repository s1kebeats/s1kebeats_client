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
      @click.prevent="uploadStore.incrementPage()"
      v-if="uploadStore.page < 3"
      >Далее</UiButton
    >
    <UiButton
      class="gap-3 ml-auto px-5 bg-black"
      @click.prevent="uploadStore.upload()"
      v-if="uploadStore.page === 3"
    >
      <Icon name="material-symbols:upload-rounded" size="1rem" />
      Опубликовать
    </UiButton>
  </div>
</template>
<script setup lang="ts">
import useUploadStore from '@/components/modules/UploadForm/store';
const uploadStore = useUploadStore();
</script>
