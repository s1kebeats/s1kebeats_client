<template>
  <form class="grow flex flex-col gap-5 h-[600px]">
    <div class="grow flex gap-5">
      <UiGradientFiller class="w-[20%]" direction="top" />
      <MediaInput
        icon="ic:outline-music-note"
        name="mp3"
        title="MP3 Аудио"
        description="Аудио в формате .mp3"
        accept=".mp3"
        @update-value="uploadStore.updateBeatMedia('mp3', $event)"
      />
      <MediaInput
        icon="ic:outline-music-note"
        name="wav"
        title="WAV Аудио"
        description="Аудио в формате .wav"
        accept=".wav"
        @update-value="uploadStore.updateBeatMedia('wave', $event)"
      />
    </div>
    <div class="grow flex gap-5">
      <MediaInput
        icon="material-symbols:image-outline-rounded"
        name="image"
        title="Обложка"
        accept=".jpg, .png, .jpeg"
        description="Изображение в формате .jpg, .png, .jpeg"
        @update-value="uploadStore.updateBeatMedia('image', $event)"
      />
      <MediaInput
        v-if="uploadStore.uploadVersion === 'extended'"
        icon="material-symbols:unarchive-outline-rounded"
        name="stems"
        title="Trackout архив"
        accept=".zip, .rar"
        description="Архив в формате .zip, .rar"
        @update-value="uploadStore.updateBeatMedia('stems', $event)"
      />
      <UiGradientFiller
        :class="
          uploadStore.uploadVersion === 'default' ? 'w-[40%]' : 'w-[10%] '
        "
        direction="bottom"
      />
    </div>
  </form>
</template>
<script setup lang="ts">
import MediaInput from './ui/MediaInput.vue';
import useUploadStore from '../store';

const uploadStore = useUploadStore();
</script>
