<template>
  <section
    class="grow flex flex-col justify-center gap-5"
    v-show="uploadStore.page === 1"
  >
    <UploadVersionSelect />
    <NavigationPanel />
  </section>
</template>
<script setup lang="ts">
import useUploadStore from '@/components/modules/UploadForm/store';
import NavigationPanel from '@/components/modules/UploadForm/components/ui/NavigationPanel.vue';
import UploadVersionSelect from './components/UploadVersionSelect.vue';

const uploadStore = useUploadStore();
</script>
