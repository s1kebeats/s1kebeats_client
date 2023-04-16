<template>
  <img
    v-if="uploadStore.beat.image"
    :src="'file://' + uploadStore.beat.image.replace(/\\/g, '/')"
    class="w-[260px] h-[260px] rounded-lg"
    alt="beatImage"
  />
  <div
    v-else
    class="w-[260px] h-[260px] text-white font-medium text-7xl rounded-lg green-bg flex items-center justify-center"
  >
    ?
  </div>
</template>
<script setup lang="ts">
import useUploadStore from '@/components/modules/UploadForm/store';

const uploadStore = useUploadStore();
</script>
