<template>
  <div
    class="relative w-full grow flex flex-col gap-5 justify-center items-between"
  >
    <div class="w-full h-[400px] flex items-center justify-center gap-5">
      <UiGradientFiller direction="top" class="w-[25%]" />
      <UploadVersionCard
        data-testid="default"
        @click="
          () => {
            fill = false;
            uploadStore.setUploadVersion('default');
          }
        "
        icon="material-symbols:upload-file-rounded"
        title="Стандартная"
        description="Mp3 + Wav"
        :selected="uploadStore.uploadVersion === 'default'"
        :class="fill ? 'border-red-500' : ''"
      />
      <UploadVersionCard
        data-testid="extended"
        @click="
          () => {
            fill = false;
            uploadStore.setUploadVersion('extended');
          }
        "
        icon="material-symbols:drive-folder-upload-rounded"
        title="Расширенная"
        description="Mp3 + Wav + Stems"
        :selected="uploadStore.uploadVersion === 'extended'"
        :class="fill ? 'border-red-500' : ''"
      />
      <UiGradientFiller direction="bottom" class="grow" />
    </div>
    <div class="absolute bottom-0 w-full flex items-center">
      <transition>
        <div
          v-if="fill"
          class="text-red-500 font-medium text-sm"
          data-testid="fillMessage"
        >
          * Выберите вид публикации
        </div>
      </transition>
      <UiButton
        class="ml-auto px-5"
        data-testid="nextButton"
        @click.prevent="next"
      >
        Далее
      </UiButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import UploadVersionCard from './ui/UploadVersionCard.vue';
import useUploadStore from '@/components/modules/UploadForm/store';

const uploadStore = useUploadStore();
const fill = ref(false);

function next() {
  if (!uploadStore.uploadVersion) {
    fill.value = true;
  } else {
    fill.value = false;
    uploadStore.incrementPage();
  }
}
</script>
