<template>
  <section
    class="flex items-center justify-center gap-5"
    v-show="uploadStore.page === 1"
  >
    <UploadVersionCard
      @click="uploadStore.setUploadVersion('default')"
      icon="material-symbols:upload-file-rounded"
      title="Стандартная"
      description="Mp3 + Wav"
    />
    <UploadVersionCard
      @click="uploadStore.setUploadVersion('extended')"
      icon="material-symbols:drive-folder-upload-rounded"
      title="Расширенная"
      description="Mp3 + Wav + Stems"
    />
  </section>
</template>
<script setup lang="ts">
import UploadVersionCard from './components/ui/UploadVersionCard.vue';
import useUploadStore from '@/components/modules/UploadForm/store';

const uploadStore = useUploadStore();
</script>
