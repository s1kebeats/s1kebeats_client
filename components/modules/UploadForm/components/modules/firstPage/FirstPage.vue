<template>
  <section
    class="grow flex flex-col justify-center gap-5"
    v-show="uploadStore.page === 1"
  >
    <div class="w-full flex items-center justify-center gap-5 h-[548px]">
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
    </div>
    <NavigationPanel />
  </section>
</template>
<script setup lang="ts">
import UploadVersionCard from './components/ui/UploadVersionCard.vue';
import useUploadStore from '@/components/modules/UploadForm/store';
import NavigationPanel from '@/components/modules/UploadForm/components/ui/NavigationPanel.vue';

const uploadStore = useUploadStore();
</script>
