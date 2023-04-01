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
        data-testid="mp3Input"
        :class="!uploadStore.beat.mp3 && fill ? 'border-red-500' : ''"
        @update-value="updateMedia('mp3', $event)"
      />
      <MediaInput
        icon="ic:outline-music-note"
        name="wave"
        title="WAV Аудио"
        description="Аудио в формате .wav"
        accept=".wav"
        data-testid="waveInput"
        :class="!uploadStore.beat.wave && fill ? 'border-red-500' : ''"
        @update-value="updateMedia('wave', $event)"
      />
    </div>
    <div class="grow flex gap-5">
      <MediaInput
        icon="material-symbols:image-outline-rounded"
        name="image"
        title="Обложка"
        accept=".jpg, .png, .jpeg"
        data-testid="imageInput"
        description="Изображение в формате .jpg, .png, .jpeg"
        @update-value="updateMedia('image', $event)"
      />
      <MediaInput
        v-if="uploadStore.uploadVersion === 'extended'"
        icon="material-symbols:unarchive-outline-rounded"
        name="stems"
        title="Trackout архив"
        accept=".zip, .rar"
        description="Архив в формате .zip, .rar"
        data-testid="stemsInput"
        :class="!uploadStore.beat.stems && fill ? 'border-red-500' : ''"
        @update-value="updateMedia('stems', $event)"
      />
      <UiGradientFiller
        :class="
          uploadStore.uploadVersion === 'default' ? 'w-[40%]' : 'w-[10%] '
        "
        direction="bottom"
      />
    </div>
    <div class="flex gap-5 items-center">
      <UiButton
        class="px-5"
        data-testid="backButton"
        @click.prevent="
          () => {
            fill = false;
            uploadStore.decrementPage();
          }
        "
      >
        Назад
      </UiButton>
      <transition>
        <div
          v-if="fill"
          class="text-red-500 font-medium text-sm"
          data-testid="fillMessage"
        >
          * Выберите медиа
        </div>
      </transition>
      <UiButton
        class="ml-auto px-5"
        @click.prevent="next"
        data-testid="nextButton"
      >
        Далее
      </UiButton>
    </div>
  </form>
</template>
<script setup lang="ts">
import MediaInput from './ui/MediaInput.vue';
import useUploadStore from '../store';

const uploadStore = useUploadStore();
const fill = ref(false);

function next() {
  if (!uploadStore.beat.wave || !uploadStore.beat.mp3) {
    fill.value = true;
  } else {
    if (uploadStore.uploadVersion === 'extended' && !uploadStore.beat.stems) {
      fill.value = true;
    } else {
      fill.value = false;
      uploadStore.incrementPage();
    }
  }
}

function updateMedia(field: 'wave' | 'mp3' | 'image' | 'stems', media: File) {
  fill.value = false;
  uploadStore.updateBeatMedia(field, media);
}
</script>
