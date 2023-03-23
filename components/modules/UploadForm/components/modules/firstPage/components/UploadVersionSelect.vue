<template>
  <div class="w-full flex items-center justify-center gap-5 h-[548px]">
    <UploadVersionCard
      data-testid="default"
      @click="uploadStore.setUploadVersion('default')"
      icon="material-symbols:upload-file-rounded"
      title="Стандартная"
      description="Mp3 + Wav"
      :selected="uploadStore.uploadVersion === 'default'"
    />
    <UploadVersionCard
      data-testid="extended"
      @click="uploadStore.setUploadVersion('extended')"
      icon="material-symbols:drive-folder-upload-rounded"
      title="Расширенная"
      description="Mp3 + Wav + Stems"
      :selected="uploadStore.uploadVersion === 'extended'"
    />
  </div>
</template>
<script setup lang="ts">
import UploadVersionCard from './ui/UploadVersionCard.vue';
import useUploadStore from '@/components/modules/UploadForm/store';

const uploadStore = useUploadStore();
</script>
