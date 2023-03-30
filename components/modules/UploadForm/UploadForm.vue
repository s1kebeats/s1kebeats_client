<template>
  <div
    class="w-[1480px] grow flex flex-col items-end justify-center gap-5 mb-[75px]"
  >
    <div class="w-full grow flex items-center justify-center">
      <!-- <transition-group name="loading"> -->
      <UploadVersionSelect v-show="uploadStore.page === 1" key="1" />
      <MediaForm v-show="uploadStore.page === 2" key="2" />
      <!-- </transition-group> -->
      <InfoForm v-show="uploadStore.page === 3" key="3" />
    </div>
    <!-- <NavigationPanel /> -->
  </div>
</template>
<script setup lang="ts">
import UploadVersionSelect from './components/UploadVersionSelect.vue';
import useUploadStore from '@/components/modules/UploadForm/store';
import NavigationPanel from '@/components/modules/UploadForm/components/ui/NavigationPanel.vue';
import MediaForm from './components/MediaForm.vue';
import InfoForm from './components/InfoForm.vue';

const uploadStore = useUploadStore();
</script>
