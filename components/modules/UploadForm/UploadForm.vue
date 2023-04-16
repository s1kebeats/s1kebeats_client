<template>
  <div class="w-[1480px] grow flex flex-col justify-center gap-5 mb-[75px]">
    <!-- TODO: transition? -->
    <UploadVersionSelect v-show="uploadStore.page === 1" key="1" />
    <MediaForm v-show="uploadStore.page === 2" key="2" />
    <InfoForm v-show="uploadStore.page === 3" key="3" @success="success" />
  </div>
</template>
<script setup lang="ts">
import UploadVersionSelect from './components/UploadVersionSelect.vue';
import useUploadStore from '@/components/modules/UploadForm/store';
import MediaForm from './components/MediaForm.vue';
import InfoForm from './components/InfoForm.vue';
import useAuthStore from '@/stores/auth';

const uploadStore = useUploadStore();
const authStore = useAuthStore();

async function success() {
  await navigateTo(`/`);
  // await navigateTo(`/${authStore.user?.username}`);
}
</script>
