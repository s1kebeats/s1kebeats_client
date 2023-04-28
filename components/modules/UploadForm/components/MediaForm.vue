<template>
  <section class="grow relative flex flex-col gap-5 justify-between px-3">
    <form class="flex flex-col gap-4">
      <BeatMediaInput
        icon="ic:outline-music-note"
        name="mp3"
        title="MP3 Аудио"
        description="Аудио в формате .mp3"
        accept=".mp3"
        data-testid="mp3Input"
        :required="true"
        :class="!uploadStore.beat.mp3 && fill ? 'border-red-500' : ''"
        field="mp3"
        :max-size="150"
        @update-value="
          () => {
            fill = false;
          }
        "
      />
      <BeatMediaInput
        icon="ic:outline-music-note"
        name="wave"
        title="WAV Аудио"
        description="Аудио в формате .wav"
        accept=".wav"
        data-testid="waveInput"
        :required="true"
        :class="!uploadStore.beat.wave && fill ? 'border-red-500' : ''"
        field="wave"
        :max-size="300"
        @update-value="
          () => {
            fill = false;
          }
        "
      />
      <BeatMediaInput
        icon="material-symbols:image-outline-rounded"
        name="image"
        title="Обложка"
        accept=".jpg, .png, .jpeg"
        data-testid="imageInput"
        description="Изображение в формате .jpg, .png, .jpeg"
        field="image"
        @update-value="
          () => {
            fill = false;
          }
        "
      />
      <BeatMediaInput
        field="stems"
        v-if="uploadStore.uploadVersion === 'extended'"
        icon="material-symbols:unarchive-outline-rounded"
        name="stems"
        title="Trackout архив"
        accept=".zip, .rar"
        description="Архив в формате .zip, .rar"
        data-testid="stemsInput"
        :required="true"
        :class="!uploadStore.beat.stems && fill ? 'border-red-500' : ''"
        :max-size="500"
        @update-value="
          () => {
            fill = false;
          }
        "
      />
    </form>
    <div class="flex gap-3 items-center">
      <UiButton
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
          class="text-red-500 font-medium text-xs"
          data-testid="fillMessage"
        >
          * Выберите медиа
        </div>
      </transition>
      <UiButton class="ml-auto" @click.prevent="next" data-testid="nextButton">
        Далее
      </UiButton>
    </div>
  </section>
</template>
<script setup lang="ts">
import BeatMediaInput from './BeatMediaInput.vue';
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
</script>
